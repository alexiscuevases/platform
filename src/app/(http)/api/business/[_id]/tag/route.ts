import { getUrlParams, apiResponseHandler } from "helpers";
import { CreateTagInterface, TagInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { BusinessModel, TagModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { CreateTagValidator } from "validations";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateTagInterface = await request.json();
    const validation = CreateTagValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    const tag = await TagModel.create({ business_id: params._id, ...body });
    return apiResponseHandler({ status: 200, result: tag });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const tags: TagInterface[] = await TagModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: tags });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
