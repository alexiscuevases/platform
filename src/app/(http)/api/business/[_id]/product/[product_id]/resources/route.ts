import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { ConnectMongo } from "@libs/mongoose";
import { ProductModel } from "@models/business/product";
import { Product, UploadProductResources } from "@typescript/models/business/product";
import { ValidatorToUploadProductResources } from "@validators/business/product";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
  product_id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: UploadProductResources = await request.json();
    const validation = ValidatorToUploadProductResources.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const productExists: Product = await ProductModel.findByIdAndUpdate(params.product_id, body);
    if (!productExists)
      return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Product resources not updated" } });

    return apiResponseHandler({ status: 200, result: productExists });
  } catch (e: any) {
    console.log(e);
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
