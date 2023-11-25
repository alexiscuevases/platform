"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { CreateVerification, Verification } from "@typescript/models/verification";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateVerification } from "@validators/verification";

const API_ENDPOINT = `${getConfigs("application").URLs.api}/verification`;

export const createVerification = async (
  dataToCreate: CreateVerification
): Promise<GeneralResponse<Verification, CreateVerification>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: ValidatorToCreateVerification,
    revalidateTags: ["verifications"]
  });

export const getVerificationById = async (
  verification_id: any,
  dataToFind?: Verification
): Promise<GeneralResponse<Verification, Verification>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/${verification_id}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["verifications", `verification-${verification_id}`] }
  });
};
