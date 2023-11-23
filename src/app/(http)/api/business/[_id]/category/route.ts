import { getUrlParams, apiResponseHandler } from "helpers";
import { CreateCategoryInterface, CategoryInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { BusinessModel, CategoryModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { CreateCategoryValidator } from "validations";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateCategoryInterface = await request.json();
    const validation = CreateCategoryValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    const category = await CategoryModel.create({ business_id: params._id, ...body });
    return apiResponseHandler({ status: 200, result: category });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const categories: CategoryInterface[] = await CategoryModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: categories });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
