import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { ProductModel } from "@models/business/product";
import { Product, UpdateProduct } from "@typescript/models/business/product";
import { ValidatorToUpdateProduct } from "@validators/business/product";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: string;
  product_id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: UpdateProduct = await request.json();
    const validation = ValidatorToUpdateProduct.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const productExists: Product = await ProductModel.findById(params.product_id);
    if (!productExists) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Product not found" } });

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    if (productExists.path !== body.path) {
      const productPathExists = await ProductModel.findOne({ business_id: params._id, path: body.path });
      if (productPathExists)
        return apiResponseHandler({ status: 200, errors: { path: "Product path already in use" } });
    }

    if (productExists.reference !== body.reference) {
      const productReferenceExists = await ProductModel.findOne({ business_id: params._id, reference: body.reference });
      if (productReferenceExists)
        return apiResponseHandler({ status: 200, errors: { reference: "Product reference already in use" } });
    }

    const productUpdated = await ProductModel.findByIdAndUpdate(productExists._id, body);
    return apiResponseHandler({ status: 200, result: productUpdated });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
