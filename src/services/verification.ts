"use server";

import { fetchData } from "helpers";
import {
  CreateVerificationInterface,
  VerificationInterface,
  ResponseInterface,
  VerificationApiResponseInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateVerificationValidator } from "validations";

const API_ENDPOINT = `${getSettings("application").URLs.api}/verification`;

export const createVerification = async (
  dataToCreate: CreateVerificationInterface
): Promise<ResponseInterface<VerificationApiResponseInterface, CreateVerificationInterface>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: CreateVerificationValidator,
    revalidateTags: ["verifications"]
  });

export const getVerificationById = async (
  verification_id: any,
  dataToFind?: VerificationInterface
): Promise<ResponseInterface<VerificationApiResponseInterface, VerificationInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/${verification_id}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["verifications", `verification-${verification_id}`] }
  });
};
