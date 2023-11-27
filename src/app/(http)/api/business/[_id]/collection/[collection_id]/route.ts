import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { ConnectMongo } from "@libs/mongoose";
import { BusinessModel } from "@models/business/business";
import { CollectionModel } from "@models/business/collection";
import { Collection, UpdateCollection } from "@typescript/models/business/collection";
import { ValidatorToUpdateCollection } from "@validators/business/collection";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: string;
  collection_id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: UpdateCollection = await request.json();
    const validation = ValidatorToUpdateCollection.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const collectionExists: Collection = await CollectionModel.findById(params.collection_id);
    if (!collectionExists)
      return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Collection not found" } });

    const business = await BusinessModel.findById(params._id);
    if (!business) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Business not found" } });

    if (collectionExists.path !== body.path) {
      const collectionPathExists = await CollectionModel.findOne({ business_id: params._id, path: body.path });
      if (collectionPathExists)
        return apiResponseHandler({ status: 200, errors: { path: "Collection path already in use" } });
    }

    const collectionUpdated = await CollectionModel.findByIdAndUpdate(collectionExists._id, body);
    return apiResponseHandler({ status: 200, result: collectionUpdated });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
