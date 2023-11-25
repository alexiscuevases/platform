"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { CreateTag, Tag, UpdateTag } from "@typescript/models/business/tag";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateTag, ValidatorToUpdateTag } from "@validators/business/tag";

const API_ENDPOINT = getConfigs("application").URLs.api;

export const createTagByBusinessId = async (
  business_id: string,
  dataToCreate: CreateTag
): Promise<GeneralResponse<Tag, CreateTag>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/tag`, "POST", dataToCreate, {
    validator: ValidatorToCreateTag,
    revalidateTags: [`business-${business_id}.tags`]
  });

export const updateTagByBusinessId = async (
  business_id: string,
  tag_id: string,
  dataToUpdate: UpdateTag
): Promise<GeneralResponse<Tag, UpdateTag>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/tag/${tag_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToUpdateTag,
    revalidateTags: [`business-${business_id}.tags`]
  });

export const getTagsByBusinessId = async (
  business_id: string,
  dataToFind?: Tag
): Promise<GeneralResponse<Tag[], Tag>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/tag?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.tags`] }
  });
};
