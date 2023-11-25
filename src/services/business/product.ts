"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { CreateProduct, Product, UpdateProduct, UploadProductResources } from "@typescript/models/business/product";
import { GeneralResponse } from "@typescript/others";
import {
  ValidatorToCreateProduct,
  ValidatorToUpdateProduct,
  ValidatorToUploadProductResources
} from "@validators/business/product";

const API_ENDPOINT = `${getConfigs("application").URLs.api}`;

export const createProductByBusinessId = async (
  business_id: string,
  dataToCreate: CreateProduct
): Promise<GeneralResponse<Product, CreateProduct>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product`, "POST", dataToCreate, {
    validator: ValidatorToCreateProduct,
    revalidateTags: [`business-${business_id}.products`]
  });

export const updateProductByBusinessId = async (
  business_id: string,
  product_id: string,
  dataToUpdate: UpdateProduct
): Promise<GeneralResponse<Product, UpdateProduct>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product/${product_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToUpdateProduct,
    revalidateTags: [`business-${business_id}.products`]
  });

export const uploadProductResourcesByBusinessId = async (
  business_id: string,
  product_id: string,
  dataToUpdate: UploadProductResources
): Promise<GeneralResponse<Product, UploadProductResources>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product/${product_id}/resources`, "PUT", dataToUpdate, {
    validator: ValidatorToUploadProductResources,
    revalidateTags: [`business-${business_id}.products`]
  });

export const getProductsByBusinessId = async (
  business_id: string,
  dataToFind?: Product
): Promise<GeneralResponse<Product[], Product>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/product?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.products`] }
  });
};

export const getProductByIdAndBusinessId = async (
  product_id: string,
  business_id: string
): Promise<GeneralResponse<Product, Product>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/product/${product_id}`, "GET", null, {
    next: {
      revalidate: 3600,
      tags: [`business-${business_id}.products`]
    }
  });
