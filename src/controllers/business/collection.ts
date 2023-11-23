import {
  ResponseInterface,
  CreateCollectionInterface,
  UpdateCollectionInterface,
  CollectionApiResponseInterface
} from "interfaces";
import { createCollectionByBusinessId, updateCollectionByBusinessId } from "services";

export class CollectionController {
  async create(
    business_id: string,
    dataToCreate: CreateCollectionInterface
  ): Promise<ResponseInterface<CollectionApiResponseInterface, CreateCollectionInterface>> {
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
    dataToUpdate: UpdateCollectionInterface
  ): Promise<ResponseInterface<CollectionApiResponseInterface, UpdateCollectionInterface>> {
    if (dataToUpdate.names)
      dataToUpdate.path = (!dataToUpdate.path ? dataToUpdate.names?.Default : dataToUpdate.path)
        .toLowerCase()
        .trim()
        .replace(/ /g, "-");

    const collection = await updateCollectionByBusinessId(business_id, collection_id, dataToUpdate);
    if (!collection.success) return { success: false, errors: collection.errors };

    return { success: true, result: collection.result };
  }
}
