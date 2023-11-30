import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { generateHash_SHA256 } from "@helpers/generateHash_SHA256";
import { getEnvironmentVariable } from "@helpers/getEnvironmentVariable";
import { BusinessModel } from "@models/business/business";
import { SubscriptionModel } from "@models/subscription";
import { TransactionModel } from "@models/transaction";
import { Business } from "@typescript/models/business";
import { Transaction } from "@typescript/models/transaction";
import { WompiEvent } from "@typescript/services/wompi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: WompiEvent = await request.json();
    const wompiTransaction = body.data.transaction;
    const checksum = generateHash_SHA256(
      `${wompiTransaction.id}${wompiTransaction.status}${wompiTransaction.amount_in_cents}${getEnvironmentVariable(
        body.environment === "test" ? "WOMPI_TEST_EVENTS_SECRET" : "WOMPI_EVENTS_SECRET"
      )}`
    );

    if (checksum !== body.signature.checksum)
      return apiResponseHandler({ status: 401, errors: { GENERAL_ERROR: "You are not authorized" } });

    if (body.event === "transaction.updated") {
      const transaction: Transaction = await TransactionModel.findOne({ transaction_id: wompiTransaction.id });
      if (!transaction) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Transaction not found" } });

      transaction.status = wompiTransaction.status;
      transaction.status_update_date = new Date();
      // @ts-expect-error
      await transaction.save();

      if (transaction.intention === "Create subscription") {
        const business: Business = await BusinessModel.findById(transaction.intention_id);
        if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

        const subscription = await SubscriptionModel.create({
          status: wompiTransaction.status === "APPROVED" ? "Active" : "Pending",
          plan: business.subscription_plan,
          cycle_start_date: new Date(),
          cycle_end_date: new Date().setMonth(new Date().getMonth() + 1)
        });
        if (!subscription)
          return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Subscription not created" } });

        business.subscription_id = subscription._id;
        business.subscription_status = wompiTransaction.status === "APPROVED" ? "Active" : "Pending";
        // @ts-expect-error
        await business.save();
      }
    }

    return apiResponseHandler({ status: 200, result: { message: "Event received" } });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
