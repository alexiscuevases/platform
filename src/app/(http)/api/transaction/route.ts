import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { TransactionModel } from "@models/transaction";
import { CreateTransaction, Transaction } from "@typescript/models/transaction";
import { ValidatorToCreateTransaction } from "@validators/models/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateTransaction = await request.json();
    const validation = ValidatorToCreateTransaction.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const transaction = await TransactionModel.create(body);
    return apiResponseHandler({ status: 200, result: transaction });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const transactions: Transaction[] = await TransactionModel.find(getUrlParams(request.url));
    return apiResponseHandler({ status: 200, result: transactions });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
