"use server";

import { fetchData } from "helpers";
import {
  CreateBusinessInterface,
  BusinessInterface,
  ResponseInterface,
  BusinessApiResponseInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateBusinessValidator } from "validations";

const API_ENDPOINT = `${getSettings("application").URLs.api}/business`;

export const createBusiness = async (
  dataToCreate: CreateBusinessInterface
): Promise<ResponseInterface<BusinessApiResponseInterface, CreateBusinessInterface>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: CreateBusinessValidator,
    revalidateTags: ["businesses"]
  });

export const getBusinesses = async (
  dataToFind?: BusinessInterface
): Promise<ResponseInterface<BusinessApiResponseInterface[], BusinessInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["businesses"] }
  });
};

export const getBusinessById = async (
  business_id?: string
): Promise<ResponseInterface<BusinessApiResponseInterface, BusinessInterface>> =>
  fetchData(`${API_ENDPOINT}/${business_id}`, "GET", null, {
    next: { revalidate: 3600, tags: ["businesses", `business-${business_id}`] }
  });
