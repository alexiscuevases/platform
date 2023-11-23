import {
  ResponseInterface,
  CreateCategoryInterface,
  UpdateCategoryInterface,
  CategoryApiResponseInterface
} from "interfaces";
import { createCategoryByBusinessId, updateCategoryByBusinessId } from "services";

export class CategoryController {
  async create(
    business_id: string,
    dataToCreate: CreateCategoryInterface
  ): Promise<ResponseInterface<CategoryApiResponseInterface, CreateCategoryInterface>> {
    const category = await createCategoryByBusinessId(business_id, dataToCreate);
    if (!category.success) return { success: false, errors: category.errors };

    return { success: true, result: category.result };
  }

  async update(
    business_id: string,
    category_id: string,
    dataToUpdate: UpdateCategoryInterface
  ): Promise<ResponseInterface<CategoryApiResponseInterface, UpdateCategoryInterface>> {
    const category = await updateCategoryByBusinessId(business_id, category_id, dataToUpdate);
    if (!category.success) return { success: false, errors: category.errors };

    return { success: true, result: category.result };
  }
}
