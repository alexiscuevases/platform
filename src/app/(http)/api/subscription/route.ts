import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { SubscriptionModel } from "@models/subscription";
import { CreateSubscription, Subscription } from "@typescript/models/subscription";
import { ValidatorToCreateSubscription } from "@validators/models/subscription";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateSubscription = await request.json();
    const validation = ValidatorToCreateSubscription.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const subscription = await SubscriptionModel.create(body);
    return apiResponseHandler({ status: 200, result: subscription });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const subscriptions: Subscription[] = await SubscriptionModel.find(getUrlParams(request.url));
    return apiResponseHandler({ status: 200, result: subscriptions });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
