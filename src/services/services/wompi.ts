"use server";

import { fetchData } from "@helpers/fetchData";
import { GeneralResponse } from "@typescript/others";
import { getEnvironmentVariable } from "@helpers/getEnvironmentVariable";
import {
  CreateWompiTransaction,
  WompiMerchant,
  CreateWompiCardTokenization,
  WompiTokenizedCard,
  WompiTransaction
} from "@typescript/services/wompi";
import { generateHash_SHA256 } from "@helpers/generateHash_SHA256";

const API_ENDPOINT = getEnvironmentVariable("WOMPI_ENDPOINT");

export const getWompiMerchant = async (): Promise<GeneralResponse<WompiMerchant, any>> => {
  const response = await fetchData(
    `${API_ENDPOINT}/merchants/${getEnvironmentVariable("WOMPI_PUBLIC_KEY")}`,
    "GET",
    null,
    {
      next: {
        revalidate: 0,
        tags: ["wompi.merchant"]
      }
    }
  );

  // @ts-expect-error
  if (!response.data) return response;
  // @ts-expect-error
  return { success: true, result: response.data };
};

export const createWompiCardTokenization = async (
  dataToCreate: CreateWompiCardTokenization
): Promise<GeneralResponse<WompiTokenizedCard, any>> => {
  const response = await fetchData(`${API_ENDPOINT}/tokens/cards`, "POST", dataToCreate, {
    headers: {
      Authorization: `Bearer ${getEnvironmentVariable("WOMPI_PUBLIC_KEY")}`
    },
    revalidateTags: ["wompi.tokens.cards"]
  });

  // @ts-expect-error
  if (!response.data) return response;
  // @ts-expect-error
  return { success: true, result: response.data };
};

export const createWompiSignature = async (
  reference: string,
  amount_in_cents: number,
  currency: string
): Promise<string> =>
  generateHash_SHA256(`${reference}${amount_in_cents}${currency}${getEnvironmentVariable("WOMPI_INTEGRITY_SECRET")}`);

export const createWompiTransaction = async (
  dataToCreate: CreateWompiTransaction
): Promise<GeneralResponse<WompiTransaction, CreateWompiTransaction>> => {
  const response = await fetchData(`${API_ENDPOINT}/transactions`, "POST", dataToCreate, {
    headers: {
      Authorization: `Bearer ${getEnvironmentVariable("WOMPI_PUBLIC_KEY")}`
    },
    revalidateTags: ["wompi.transactions"]
  });

  // @ts-expect-error
  if (!response.data) return response;
  // @ts-expect-error
  return { success: true, result: response.data };
};

export const getWompiTransaction = async (
  transaction_id: any
): Promise<GeneralResponse<WompiTransaction, WompiTransaction>> => {
  const response = await fetchData(`${API_ENDPOINT}/transactions/${transaction_id}`, "GET", null, {
    next: { revalidate: 3600, tags: ["wompi.transactions", `wompi.transaction-${transaction_id}`] }
  });

  // @ts-expect-error
  if (!response.data) return response;
  // @ts-expect-error
  return { success: true, result: response.data };
};
