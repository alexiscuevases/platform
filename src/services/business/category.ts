"use server";

import { fetchData } from "helpers";
import {
  CreateCategoryInterface,
  CategoryInterface,
  ResponseInterface,
  CategoryApiResponseInterface,
  UpdateCategoryInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateCategoryValidator, UpdateCategoryValidator } from "validations";

const API_ENDPOINT = getSettings("application").URLs.api;

export const createCategoryByBusinessId = async (
  business_id: string,
  dataToCreate: CreateCategoryInterface
): Promise<ResponseInterface<CategoryApiResponseInterface, CreateCategoryInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/category`, "POST", dataToCreate, {
    validator: CreateCategoryValidator,
    revalidateTags: [`business-${business_id}.categories`]
  });

export const updateCategoryByBusinessId = async (
  business_id: string,
  category_id: string,
  dataToUpdate: UpdateCategoryInterface
): Promise<ResponseInterface<CategoryApiResponseInterface, UpdateCategoryInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/category/${category_id}`, "PUT", dataToUpdate, {
    validator: UpdateCategoryValidator,
    revalidateTags: [`business-${business_id}.categories`]
  });

export const getCategoriesByBusinessId = async (
  business_id: string,
  dataToFind?: CategoryInterface
): Promise<ResponseInterface<CategoryApiResponseInterface[], CategoryInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/category?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.categories`] }
  });
};
