"use server";

import { fetchData } from "helpers";
import {
  CreateProviderInterface,
  ProviderInterface,
  ResponseInterface,
  ProviderApiResponseInterface,
  UpdateProviderInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateProviderValidator, UpdateProviderValidator } from "validations";

const API_ENDPOINT = getSettings("application").URLs.api;

export const createProviderByBusinessId = async (
  business_id: string,
  dataToCreate: CreateProviderInterface
): Promise<ResponseInterface<ProviderApiResponseInterface, CreateProviderInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/provider`, "POST", dataToCreate, {
    validator: CreateProviderValidator,
    revalidateTags: [`business-${business_id}.providers`]
  });

export const updateProviderByBusinessId = async (
  business_id: string,
  provider_id: string,
  dataToUpdate: UpdateProviderInterface
): Promise<ResponseInterface<ProviderApiResponseInterface, UpdateProviderInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/provider/${provider_id}`, "PUT", dataToUpdate, {
    validator: UpdateProviderValidator,
    revalidateTags: [`business-${business_id}.providers`]
  });

export const getProvidersByBusinessId = async (
  business_id: string,
  dataToFind?: ProviderInterface
): Promise<ResponseInterface<ProviderApiResponseInterface[], ProviderInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/provider?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.providers`] }
  });
};
