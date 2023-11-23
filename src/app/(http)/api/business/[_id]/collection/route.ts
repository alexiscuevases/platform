import { getUrlParams, apiResponseHandler } from "helpers";
import { CreateCollectionInterface, CollectionInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { BusinessModel, CollectionModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { CreateCollectionValidator } from "validations";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateCollectionInterface = await request.json();
    const validation = CreateCollectionValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    const collectionPathExists = await CollectionModel.findOne({ business_id: params._id, path: body.path });
    if (collectionPathExists)
      return apiResponseHandler({ status: 200, errors: { path: "Collection path already in use" } });

    const collection = await CollectionModel.create({ business_id: params._id, ...body });
    return apiResponseHandler({ status: 200, result: collection });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    const collections: CollectionInterface[] = await CollectionModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: collections });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
