import { apiResponseHandler } from "helpers";
import { ProductInterface, UpdateProductInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { BusinessModel, ProductModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { UpdateProductValidator } from "validations";

interface Params {
  _id: any;
  product_id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: UpdateProductInterface = await request.json();
    const validation = UpdateProductValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const productExists: ProductInterface = await ProductModel.findById(params.product_id);
    if (!productExists) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Product not found" } });

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    if (productExists.path !== body.path) {
      const productPathExists = await ProductModel.findOne({ business_id: params._id, path: body.path });
      if (productPathExists)
        return apiResponseHandler({ status: 200, errors: { path: "Product path already in use" } });
    }

    const productUpdated = await ProductModel.findByIdAndUpdate(productExists._id, body);
    return apiResponseHandler({ status: 200, result: productUpdated });
  } catch (e: any) {
    console.log(e);
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
