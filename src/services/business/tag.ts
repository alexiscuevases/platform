"use server";

import { fetchData } from "helpers";
import {
  CreateTagInterface,
  TagInterface,
  ResponseInterface,
  TagApiResponseInterface,
  UpdateTagInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateTagValidator, UpdateTagValidator } from "validations";

const API_ENDPOINT = getSettings("application").URLs.api;

export const createTagByBusinessId = async (
  business_id: string,
  dataToCreate: CreateTagInterface
): Promise<ResponseInterface<TagApiResponseInterface, CreateTagInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/tag`, "POST", dataToCreate, {
    validator: CreateTagValidator,
    revalidateTags: [`business-${business_id}.tags`]
  });

export const updateTagByBusinessId = async (
  business_id: string,
  tag_id: string,
  dataToUpdate: UpdateTagInterface
): Promise<ResponseInterface<TagApiResponseInterface, UpdateTagInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/tag/${tag_id}`, "PUT", dataToUpdate, {
    validator: UpdateTagValidator,
    revalidateTags: [`business-${business_id}.tags`]
  });

export const getTagsByBusinessId = async (
  business_id: string,
  dataToFind?: TagInterface
): Promise<ResponseInterface<TagApiResponseInterface[], TagInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/tag?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.tags`] }
  });
};
