import { getUrlParams, apiResponseHandler } from "helpers";
import { CreateProviderInterface, ProviderInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { BusinessModel, ProviderModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { CreateProviderValidator } from "validations";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateProviderInterface = await request.json();
    const validation = CreateProviderValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    const provider = await ProviderModel.create({ business_id: params._id, ...body });
    return apiResponseHandler({ status: 200, result: provider });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const providers: ProviderInterface[] = await ProviderModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: providers });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
