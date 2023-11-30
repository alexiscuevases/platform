import { ResourceController } from "@controllers/resource";
import {
  createCollectionByBusinessId,
  deleteCollectionByBusinessId,
  updateCollectionByBusinessId,
  uploadCollectionResourcesByBusinessId
} from "@services/business/collection";
import {
  Collection,
  CreateCollection,
  UpdateCollection,
  UploadCollectionResources
} from "@typescript/models/business/collection";
import { Resource } from "@typescript/models/resource";
import { GeneralResponse } from "@typescript/others";

const resourceController = new ResourceController();

export class CollectionController {
  async create(
    business_id: string,
    dataToCreate: CreateCollection
  ): Promise<GeneralResponse<Collection, CreateCollection>> {
    if (dataToCreate.names)
      dataToCreate.path = (!dataToCreate.path ? dataToCreate.names?.["Default"] : dataToCreate.path)
        .toLowerCase()
        .trim()
        .replace(/ /g, "-");

    const collection = await createCollectionByBusinessId(business_id, dataToCreate);
    if (!collection.success) return { success: false, errors: collection.errors };

    return { success: true, result: collection.result };
  }

  async update(
    business_id: string,
    collection_id: string,
    dataToUpdate: UpdateCollection
  ): Promise<GeneralResponse<Collection, UpdateCollection>> {
    if (dataToUpdate.names)
      dataToUpdate.path = (!dataToUpdate.path ? dataToUpdate.names?.["Default"] : dataToUpdate.path)
        .toLowerCase()
        .trim()
        .replace(/ /g, "-");

    const collection = await updateCollectionByBusinessId(business_id, collection_id, dataToUpdate);
    if (!collection.success) return { success: false, errors: collection.errors };

    return { success: true, result: collection.result };
  }

  async delete(business_id: string, collection_id: string): Promise<GeneralResponse<void, void>> {
    const collection = await deleteCollectionByBusinessId(business_id, collection_id);
    if (!collection.success) return { success: false, errors: collection.errors };

    return { success: true };
  }

  async uploadResources(
    business_id: string,
    product_id: string,
    resources: (File | Resource)[]
  ): Promise<GeneralResponse<Collection, UploadCollectionResources>> {
    // @ts-expect-error
    const alreadyResources = resources.filter(resource => !resource.name) as Resource[];
    // @ts-expect-error
    const resourcesToUpload = resources.filter(resource => resource.name) as File[];
    const uploadedResources = await resourceController.uploadResources(resourcesToUpload);
    if (!uploadedResources.success) return { success: false, errors: uploadedResources.errors };

    const product = await uploadCollectionResourcesByBusinessId(business_id, product_id, {
      resources: [...alreadyResources, ...uploadedResources.result]
    });
    if (!product.success) {
      //-- WARNING: Delete resources uploaded.
      return { success: false, errors: product.errors };
    }

    return { success: true };
  }
}
