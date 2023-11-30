import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { CollectionModel } from "@models/business/collection";
import { Collection, CreateCollection } from "@typescript/models/business/collection";
import { ValidatorToCreateCollection } from "@validators/models/business/collection";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
}

export async function POST(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: CreateCollection = await request.json();
    const validation = ValidatorToCreateCollection.validate(body);
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
    const collections: Collection[] = await CollectionModel.find({
      business_id: params._id,
      ...getUrlParams(request.url)
    });
    return apiResponseHandler({ status: 200, result: collections });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();
    await CollectionModel.findByIdAndRemove(params._id);

    return apiResponseHandler({ status: 200 });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
