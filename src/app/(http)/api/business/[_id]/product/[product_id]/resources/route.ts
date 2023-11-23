import { apiResponseHandler } from "helpers";
import { ProductInterface, UploadProductResourcesInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { ProductModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { UploadProductResourcesValidator } from "validations";

interface Params {
  _id: any;
  product_id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: UploadProductResourcesInterface = await request.json();
    const validation = UploadProductResourcesValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const productExists: ProductInterface = await ProductModel.findByIdAndUpdate(params.product_id, body);
    if (!productExists)
      return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Product resources not updated" } });

    return apiResponseHandler({ status: 200, result: productExists });
  } catch (e: any) {
    console.log(e);
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
