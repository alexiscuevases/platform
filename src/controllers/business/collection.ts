import {
  createCollectionByBusinessId,
  deleteCollectionByBusinessId,
  updateCollectionByBusinessId
} from "@services/business/collection";
import { Collection, CreateCollection, UpdateCollection } from "@typescript/models/business/collection";
import { GeneralResponse } from "@typescript/others";

export class CollectionController {
  async create(
    business_id: string,
    dataToCreate: CreateCollection
  ): Promise<GeneralResponse<Collection, CreateCollection>> {
    if (dataToCreate.names)
      dataToCreate.path = (!dataToCreate.path ? dataToCreate.names?.Default : dataToCreate.path)
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
      dataToUpdate.path = (!dataToUpdate.path ? dataToUpdate.names?.Default : dataToUpdate.path)
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
}
