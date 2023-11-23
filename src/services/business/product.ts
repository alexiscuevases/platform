"use server";

import { fetchData } from "helpers";
import {
  CreateProductInterface,
  ProductApiResponseInterface,
  ProductInterface,
  ResponseInterface,
  UpdateProductInterface,
  UploadProductResourcesInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateProductValidator, UploadProductResourcesValidator, UpdateProductValidator } from "validations";

const API_ENDPOINT = `${getSettings("application").URLs.api}`;

export const createProductByBusinessId = async (
  business_id: string,
  dataToCreate: CreateProductInterface
): Promise<ResponseInterface<ProductApiResponseInterface, CreateProductInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product`, "POST", dataToCreate, {
    validator: CreateProductValidator,
    revalidateTags: [`business-${business_id}.products`]
  });

export const updateProductByBusinessId = async (
  business_id: string,
  product_id: string,
  dataToUpdate: UpdateProductInterface
): Promise<ResponseInterface<ProductApiResponseInterface, UpdateProductInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product/${product_id}`, "PUT", dataToUpdate, {
    validator: UpdateProductValidator,
    revalidateTags: [`business-${business_id}.products`]
  });

export const uploadProductResourcesByBusinessId = async (
  business_id: string,
  product_id: string,
  dataToUpdate: UploadProductResourcesInterface
): Promise<ResponseInterface<ProductApiResponseInterface, UploadProductResourcesInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product/${product_id}/resources`, "PUT", dataToUpdate, {
    validator: UploadProductResourcesValidator,
    revalidateTags: [`business-${business_id}.products`]
  });

export const getProductsByBusinessId = async (
  business_id: string,
  dataToFind?: ProductInterface
): Promise<ResponseInterface<ProductApiResponseInterface[], ProductInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/product?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.products`] }
  });
};

export const getProductByIdAndBusinessId = async (
  product_id: string,
  business_id: string
): Promise<ResponseInterface<ProductApiResponseInterface, ProductInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product/${product_id}`, "GET", null, {
    next: {
      revalidate: 3600,
      tags: [`business-${business_id}.products`]
    }
  });
