"use server";

import { fetchData } from "@helpers/fetchData";
import { GeneralResponse } from "@typescript/others";
import { getEnvironmentVariable } from "@helpers/getEnvironmentVariable";
import { CreateTransaction, TokenizeCard, Transaction } from "@typescript/models/transaction";

const API_ENDPOINT = getEnvironmentVariable("WOMPI_ENDPOINT");

export const getWompiMerchant = async () =>
  fetchData(`${API_ENDPOINT}/merchants/${getEnvironmentVariable("WOMPI_PUBLIC_KEY")}`, "GET", null, {
    next: {
      revalidate: 0,
      tags: ["merchant"]
    }
  });

export const createWompiSignature = async (reference, amount_in_cents, currency) => {
  const encondedText = new TextEncoder().encode(
    `${reference}${amount_in_cents}${currency}${getEnvironmentVariable("WOMPI_INTEGRITY_SECRET")}`
  );
  const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
};

export const CreateTokenizedCard = async (dataToCreate: TokenizeCard) =>
  fetchData(`${API_ENDPOINT}/tokens/cards`, "POST", dataToCreate, {
    headers: {
      Authorization: `Bearer ${getEnvironmentVariable("WOMPI_PUBLIC_KEY")}`
    },
    revalidateTags: ["tokenizedCards"]
  });

export const createWompiTransaction = async (
  dataToCreate: CreateTransaction
): Promise<GeneralResponse<Transaction, CreateTransaction>> =>
  fetchData(`${API_ENDPOINT}/transactions`, "POST", dataToCreate, {
    headers: {
      Authorization: `Bearer ${getEnvironmentVariable("WOMPI_PUBLIC_KEY")}`
    },
    revalidateTags: ["transactions"]
  });

export const getWompiTransaction = async (
  transaction_id: any,
  dataToFind?: Transaction
): Promise<GeneralResponse<Transaction, Transaction>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/${transaction_id}?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: ["transactions", `transaction-${transaction_id}`] }
  });
};
