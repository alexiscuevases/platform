"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { CreateSubscription, Subscription } from "@typescript/models/subscription";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateSubscription } from "@validators/models/subscription";

const API_ENDPOINT = `${getConfigs("application").URLs.api}/subscription`;

export const createSubscription = async (
  dataToCreate: CreateSubscription
): Promise<GeneralResponse<Subscription, CreateSubscription>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: ValidatorToCreateSubscription,
    revalidateTags: ["subscriptions"]
  });

export const getSubscriptionById = async (
  verification_id: any,
  dataToFind?: Subscription
): Promise<GeneralResponse<Subscription, Subscription>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/${verification_id}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["subscriptions", `subscription-${verification_id}`] }
  });
};
