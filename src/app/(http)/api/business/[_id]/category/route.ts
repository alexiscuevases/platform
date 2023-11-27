import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { CategoryModel } from "@models/business/category";
import { Category, CreateCategory } from "@typescript/models/business/category";
import { ValidatorToCreateCategory } from "@validators/business/category";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateCategory = await request.json();
    const validation = ValidatorToCreateCategory.validate(body);
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
    const categories: Category[] = await CategoryModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: categories });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    await CategoryModel.findByIdAndRemove(params._id);

    return apiResponseHandler({ status: 200 });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
