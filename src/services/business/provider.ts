"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { CreateProvider, Provider, UpdateProvider } from "@typescript/models/business/provider";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateProvider, ValidatorToUpdateProvider } from "@validators/business/provider";

const API_ENDPOINT = getConfigs("application").URLs.api;

export const createProviderByBusinessId = async (
  business_id: string,
  dataToCreate: CreateProvider
): Promise<GeneralResponse<Provider, CreateProvider>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/provider`, "POST", dataToCreate, {
    validator: ValidatorToCreateProvider,
    revalidateTags: [`business-${business_id}.providers`]
  });

export const updateProviderByBusinessId = async (
  business_id: string,
  provider_id: string,
  dataToUpdate: UpdateProvider
): Promise<GeneralResponse<Provider, UpdateProvider>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/provider/${provider_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToUpdateProvider,
    revalidateTags: [`business-${business_id}.providers`]
  });

export const deleteProviderByBusinessId = async (
  business_id: string,
  provider_id: string
): Promise<GeneralResponse<void, void>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/provider/${provider_id}`, "DELETE", null, {
    revalidateTags: [`business-${business_id}.providers`]
  });

export const getProvidersByBusinessId = async (
  business_id: string,
  dataToFind?: Provider
): Promise<GeneralResponse<Provider[], Provider>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/provider?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.providers`] }
  });
};
