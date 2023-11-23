import { ResponseInterface, CreateTagInterface, UpdateTagInterface, TagApiResponseInterface } from "interfaces";
import { createTagByBusinessId, updateTagByBusinessId } from "services";

export class TagController {
  async create(
    business_id: string,
    dataToCreate: CreateTagInterface
  ): Promise<ResponseInterface<TagApiResponseInterface, CreateTagInterface>> {
    const tag = await createTagByBusinessId(business_id, dataToCreate);
    if (!tag.success) return { success: false, errors: tag.errors };

    return { success: true, result: tag.result };
  }

  async update(
    business_id: string,
    tag_id: string,
    dataToUpdate: UpdateTagInterface
  ): Promise<ResponseInterface<TagApiResponseInterface, UpdateTagInterface>> {
    const tag = await updateTagByBusinessId(business_id, tag_id, dataToUpdate);
    if (!tag.success) return { success: false, errors: tag.errors };

    return { success: true, result: tag.result };
  }
}
