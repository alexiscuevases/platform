"use server";

import { fetchData } from "@helpers/fetchData";
import { getConfigs } from "@helpers/getConfigs";
import { Category, CreateCategory, UpdateCategory } from "@typescript/models/business/category";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateCategory, ValidatorToUpdateCategory } from "@validators/business/category";

const API_ENDPOINT = getConfigs("application").URLs.api;

export const createCategoryByBusinessId = async (
  business_id: string,
  dataToCreate: CreateCategory
): Promise<GeneralResponse<Category, CreateCategory>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/category`, "POST", dataToCreate, {
    validator: ValidatorToCreateCategory,
    revalidateTags: [`business-${business_id}.categories`]
  });

export const updateCategoryByBusinessId = async (
  business_id: string,
  category_id: string,
  dataToUpdate: UpdateCategory
): Promise<GeneralResponse<Category, UpdateCategory>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/category/${category_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToUpdateCategory,
    revalidateTags: [`business-${business_id}.categories`]
  });

export const deleteCategoryByBusinessId = async (
  business_id: string,
  category_id: string
): Promise<GeneralResponse<void, void>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/category/${category_id}`, "DELETE", null, {
    validator: ValidatorToUpdateCategory,
    revalidateTags: [`business-${business_id}.categories`]
  });

export const getCategoriesByBusinessId = async (
  business_id: string,
  dataToFind?: Category
): Promise<GeneralResponse<Category[], Category>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/category?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.categories`] }
  });
};
