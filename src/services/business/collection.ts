"use server";

import { fetchData } from "helpers";
import {
  CreateCollectionInterface,
  CollectionInterface,
  ResponseInterface,
  CollectionApiResponseInterface,
  UpdateCollectionInterface
} from "interfaces";
import { getSettings } from "settings";
import { CreateCollectionValidator, UpdateCollectionValidator } from "validations";

const API_ENDPOINT = getSettings("application").URLs.api;

export const createCollectionByBusinessId = async (
  business_id: string,
  dataToCreate: CreateCollectionInterface
): Promise<ResponseInterface<CollectionApiResponseInterface, CreateCollectionInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/collection`, "POST", dataToCreate, {
    validator: CreateCollectionValidator,
    revalidateTags: [`business-${business_id}.collections`]
  });

export const updateCollectionByBusinessId = async (
  business_id: string,
  collection_id: string,
  dataToUpdate: UpdateCollectionInterface
): Promise<ResponseInterface<CollectionApiResponseInterface, UpdateCollectionInterface>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/collection/${collection_id}`, "PUT", dataToUpdate, {
    validator: UpdateCollectionValidator,
    revalidateTags: [`business-${business_id}.collections`]
  });

export const getCollectionsByBusinessId = async (
  business_id: string,
  dataToFind?: CollectionInterface
): Promise<ResponseInterface<CollectionApiResponseInterface[], CollectionInterface>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/collection?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.collections`] }
  });
};
