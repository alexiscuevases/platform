"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { CreateTransaction, Transaction } from "@typescript/models/transaction";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateTransaction } from "@validators/models/transaction";

const API_ENDPOINT = `${getConfigs("application").URLs.api}/transaction`;

export const createTransaction = async (
  dataToCreate: CreateTransaction
): Promise<GeneralResponse<Transaction, CreateTransaction>> =>
  fetchData(API_ENDPOINT, "POST", dataToCreate, {
    validator: ValidatorToCreateTransaction,
    revalidateTags: ["transactions"]
  });

export const getTransactionById = async (
  verification_id: any,
  dataToFind?: Transaction
): Promise<GeneralResponse<Transaction, Transaction>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/${verification_id}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["transactions", `transaction-${verification_id}`] }
  });
};
