"use server";

import { fetchData } from "@helpers/fetchData";
import { getConfigs } from "@helpers/getConfigs";
import {
  Collection,
  CreateCollection,
  UpdateCollection,
  UploadCollectionResources
} from "@typescript/models/business/collection";
import { GeneralResponse } from "@typescript/others";
import {
  ValidatorToCreateCollection,
  ValidatorToUpdateCollection,
  ValidatorToUploadCollectionResources
} from "@validators/business/collection";

const API_ENDPOINT = getConfigs("application").URLs.api;

export const createCollectionByBusinessId = async (
  business_id: string,
  dataToCreate: CreateCollection
): Promise<GeneralResponse<Collection, CreateCollection>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/collection`, "POST", dataToCreate, {
    validator: ValidatorToCreateCollection,
    revalidateTags: [`business-${business_id}.collections`]
  });

export const updateCollectionByBusinessId = async (
  business_id: string,
  collection_id: string,
  dataToUpdate: UpdateCollection
): Promise<GeneralResponse<Collection, UpdateCollection>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/collection/${collection_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToUpdateCollection,
    revalidateTags: [`business-${business_id}.collections`]
  });

export const deleteCollectionByBusinessId = async (
  business_id: string,
  collection_id: string
): Promise<GeneralResponse<void, void>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/collection/${collection_id}`, "DELETE", null, {
    revalidateTags: [`business-${business_id}.collections`]
  });

export const uploadCollectionResourcesByBusinessId = async (
  business_id: string,
  collection_id: string,
  dataToUpdate: UploadCollectionResources
): Promise<GeneralResponse<Collection, UploadCollectionResources>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/collection/${collection_id}/resources`, "PUT", dataToUpdate, {
    validator: ValidatorToUploadCollectionResources,
    revalidateTags: [`business-${business_id}.collections`]
  });

export const getCollectionsByBusinessId = async (
  business_id: string,
  dataToFind?: Collection
): Promise<GeneralResponse<Collection[], Collection>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/collection?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.collections`] }
  });
};
