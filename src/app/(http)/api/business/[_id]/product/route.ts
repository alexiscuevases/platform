import { getUrlParams, apiResponseHandler } from "helpers";
import { CreateProductInterface, ProductInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { BusinessModel, ProductModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { CreateProductValidator } from "validations";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateProductInterface = await request.json();
    const validation = CreateProductValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    const productPathExists = await ProductModel.findOne({ business_id: params._id, path: body.path });
    if (productPathExists) return apiResponseHandler({ status: 200, errors: { path: "Product path already in use" } });

    const product = await ProductModel.create({ business_id: params._id, ...body });
    return apiResponseHandler({ status: 200, result: product });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const products: ProductInterface[] = await ProductModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: products });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
