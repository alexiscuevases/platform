import { createTagByBusinessId, updateTagByBusinessId } from "@services/business/tag";
import { CreateTag, Tag, UpdateTag } from "@typescript/models/business/tag";
import { GeneralResponse } from "@typescript/others";

export class TagController {
  async create(business_id: string, dataToCreate: CreateTag): Promise<GeneralResponse<Tag, CreateTag>> {
    const tag = await createTagByBusinessId(business_id, dataToCreate);
    if (!tag.success) return { success: false, errors: tag.errors };

    return { success: true, result: tag.result };
  }

  async update(business_id: string, tag_id: string, dataToUpdate: UpdateTag): Promise<GeneralResponse<Tag, UpdateTag>> {
    const tag = await updateTagByBusinessId(business_id, tag_id, dataToUpdate);
    if (!tag.success) return { success: false, errors: tag.errors };

    return { success: true, result: tag.result };
  }
}
