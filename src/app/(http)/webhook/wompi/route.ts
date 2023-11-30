import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { generateHash_SHA256 } from "@helpers/generateHash_SHA256";
import { getEnvironmentVariable } from "@helpers/getEnvironmentVariable";
import { WompiEvent } from "@typescript/services/wompi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: WompiEvent = await request.json();
    const transaction = body.data.transaction;
    const checksum = generateHash_SHA256(
      `${transaction.id}${transaction.status}${transaction.amount_in_cents}${getEnvironmentVariable(
        "WOMPI_EVENTS_SECRET"
      )}`
    );

    if (checksum !== body.signature.checksum)
      return apiResponseHandler({ status: 401, errors: { GENERAL_ERROR: "You are not authorized" } });

    return apiResponseHandler({ status: 200, result: body });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
