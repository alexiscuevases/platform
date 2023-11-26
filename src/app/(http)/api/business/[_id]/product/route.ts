import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { ProductModel } from "@models/business/product";
import { CreateProduct, Product } from "@typescript/models/business/product";
import { ValidatorToCreateProduct } from "@validators/business/product";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateProduct = await request.json();
    const validation = ValidatorToCreateProduct.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    const productPathExists = await ProductModel.findOne({ business_id: params._id, path: body.path });
    if (productPathExists) return apiResponseHandler({ status: 200, errors: { path: "Product path already in use" } });

    const productReferenceExists = await ProductModel.findOne({ business_id: params._id, reference: body.reference });
    if (productReferenceExists)
      return apiResponseHandler({ status: 200, errors: { reference: "Product reference already in use" } });

    const product = await ProductModel.create({ business_id: params._id, ...body });
    return apiResponseHandler({ status: 200, result: product });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const products: Product[] = await ProductModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: products });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
