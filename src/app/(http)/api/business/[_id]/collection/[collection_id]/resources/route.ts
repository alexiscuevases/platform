import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { ConnectMongo } from "@libs/mongoose";
import { CollectionModel } from "@models/business/collection";
import { Collection, UploadCollectionResources } from "@typescript/models/business/collection";
import { ValidatorToUploadCollectionResources } from "@validators/business/collection";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
  collection_id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: UploadCollectionResources = await request.json();
    const validation = ValidatorToUploadCollectionResources.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const collectionExists: Collection = await CollectionModel.findByIdAndUpdate(params.collection_id, body);
    if (!collectionExists)
      return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Collection resources not updated" } });

    return apiResponseHandler({ status: 200, result: collectionExists });
  } catch (e: any) {
    console.log(e);
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
