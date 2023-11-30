"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { Business, CreateBusiness } from "@typescript/models/business";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateBusiness } from "@validators/models/business";

const API_ENDPOINT = `${getConfigs("application").URLs.api}/business`;

export const createBusiness = async (
  dataToCreate: CreateBusiness
): Promise<GeneralResponse<Business, CreateBusiness>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: ValidatorToCreateBusiness,
    revalidateTags: ["businesses"]
  });

export const getBusinesses = async (dataToFind?: Business): Promise<GeneralResponse<Business[], Business>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["businesses"] }
  });
};

export const getBusinessById = async (business_id?: string): Promise<GeneralResponse<Business, Business>> =>
  fetchData(`${API_ENDPOINT}/${business_id}`, "GET", null, {
    next: { revalidate: 3600, tags: ["businesses", `business-${business_id}`] }
  });
