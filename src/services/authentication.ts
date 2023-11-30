"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { Authentication, CreateAuthentication, UpdateAuthentication } from "@typescript/models/authentication";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateAuthentication, ValidatorToUpdateAuthentication } from "@validators/models/authentication";

const API_ENDPOINT = `${getConfigs("application").URLs.api}/authentication`;

export const createAuthentication = async (
  dataToCreate: CreateAuthentication
): Promise<GeneralResponse<Authentication, CreateAuthentication>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: ValidatorToCreateAuthentication,
    revalidateTags: ["authentications"]
  });

export const updateAuthenticationById = async (
  authentication_id: string,
  dataToUpdate: UpdateAuthentication
): Promise<GeneralResponse<Authentication, UpdateAuthentication>> => {
  return fetchData(`${API_ENDPOINT}/${authentication_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToUpdateAuthentication,
    revalidateTags: [`authentication-${authentication_id}`]
  });
};

export const getAuthenticationById = async (
  authentication_id: string
): Promise<GeneralResponse<Authentication, Authentication>> =>
  fetchData(`${API_ENDPOINT}/${authentication_id}`, "GET", null, {
    next: { revalidate: 3600, tags: ["authentications", `authentication-${authentication_id}`] }
  });
