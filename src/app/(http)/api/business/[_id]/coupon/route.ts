import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { CouponModel } from "@models/business/coupon";
import { CreateCoupon, Coupon } from "@typescript/models/business/coupon";
import { ValidatorToCreateCoupon } from "@validators/models/business/coupon";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateCoupon = await request.json();
    const validation = ValidatorToCreateCoupon.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    const coupon = await CouponModel.create({ business_id: params._id, ...body });
    return apiResponseHandler({ status: 200, result: coupon });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const coupons: Coupon[] = await CouponModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: coupons });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    await CouponModel.findByIdAndRemove(params._id);

    return apiResponseHandler({ status: 200 });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
