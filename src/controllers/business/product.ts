import {
  ResponseInterface,
  CreateProductInterface,
  UpdateProductInterface,
  ProductApiResponseInterface,
  UploadProductResourcesInterface,
  ResourceInterface
} from "interfaces";
import { createProductByBusinessId, updateProductByBusinessId, uploadProductResourcesByBusinessId } from "services";
import { ResourceController } from "../resource";

const resourceController = new ResourceController();

export class ProductController {
  async create(
    business_id: string,
    dataToCreate: CreateProductInterface
  ): Promise<ResponseInterface<ProductApiResponseInterface, CreateProductInterface>> {
    if (dataToCreate.names)
      dataToCreate.path = (!dataToCreate.path ? dataToCreate.names?.Default : dataToCreate.path)
        .toLowerCase()
        .trim()
        .replace(/ /g, "-");

    const product = await createProductByBusinessId(business_id, dataToCreate);
    if (!product.success) return { success: false, errors: product.errors };

    return { success: true, result: product.result };
  }

  async update(
    business_id: string,
    product_id: string,
    dataToUpdate: UpdateProductInterface
  ): Promise<ResponseInterface<ProductApiResponseInterface, UpdateProductInterface>> {
    if (dataToUpdate.names)
      dataToUpdate.path = (!dataToUpdate.path ? dataToUpdate.names?.Default : dataToUpdate.path)
        .toLowerCase()
        .trim()
        .replace(/ /g, "-");

    const product = await updateProductByBusinessId(business_id, product_id, dataToUpdate);
    if (!product.success) return { success: false, errors: product.errors };

    return { success: true, result: product.result };
  }

  async uploadResources(
    business_id: string,
    product_id: string,
    resources: (File | ResourceInterface)[]
  ): Promise<ResponseInterface<ProductApiResponseInterface, UploadProductResourcesInterface>> {
    // @ts-expect-error
    const alreadyResources = resources.filter(resource => !resource.name) as ResourceInterface[];
    // @ts-expect-error
    const resourcesToUpload = resources.filter(resource => resource.name) as File[];
    const uploadedResources = await resourceController.uploadResources(resourcesToUpload);
    if (!uploadedResources.success) return { success: false, errors: uploadedResources.errors };

    const product = await uploadProductResourcesByBusinessId(business_id, product_id, {
      resources: [...alreadyResources, ...uploadedResources.result]
    });
    if (!product.success) {
      //-- WARNING: Delete resources uploaded.
      return { success: false, errors: product.errors };
    }

    return { success: true };
  }
}
