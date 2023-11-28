import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { WompiEvent } from "@typescript/services/wompi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: WompiEvent = await request.json();

    return apiResponseHandler({ status: 200, result: body });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
