import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { TagModel } from "@models/business/tag";
import { CreateTag, Tag } from "@typescript/models/business/tag";
import { ValidatorToCreateTag } from "@validators/business/tag";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateTag = await request.json();
    const validation = ValidatorToCreateTag.validate(body);
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
    const tags: Tag[] = await TagModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: tags });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    await TagModel.findByIdAndRemove(params._id);

    return apiResponseHandler({ status: 200 });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
