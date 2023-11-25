import { createCategoryByBusinessId, updateCategoryByBusinessId } from "@services/business/category";
import { Category, CreateCategory, UpdateCategory } from "@typescript/models/business/category";
import { GeneralResponse } from "@typescript/others";

export class CategoryController {
  async create(business_id: string, dataToCreate: CreateCategory): Promise<GeneralResponse<Category, CreateCategory>> {
    const category = await createCategoryByBusinessId(business_id, dataToCreate);
    if (!category.success) return { success: false, errors: category.errors };

    return { success: true, result: category.result };
  }

  async update(
    business_id: string,
    category_id: string,
    dataToUpdate: UpdateCategory
  ): Promise<GeneralResponse<Category, UpdateCategory>> {
    const category = await updateCategoryByBusinessId(business_id, category_id, dataToUpdate);
    if (!category.success) return { success: false, errors: category.errors };

    return { success: true, result: category.result };
  }
}
