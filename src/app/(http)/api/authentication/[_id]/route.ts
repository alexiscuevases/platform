import { apiResponseHandler } from "helpers";
import { AuthenticationInterface, UpdateAuthenticationInterface } from "interfaces";
import { AuthenticationModel } from "models";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ConnectMongo } from "utilities";
import { UpdateAuthenticationValidator } from "validations";

interface Params {
  _id: any;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: UpdateAuthenticationInterface = await request.json();
    const validation = UpdateAuthenticationValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const authentication = await AuthenticationModel.findByIdAndUpdate({ _id: params._id }, body);
    return apiResponseHandler({ status: 200, result: authentication });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();

    const authentications: AuthenticationInterface[] = await AuthenticationModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(params._id) }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      }
    ]);

    if (authentications.length > 0) return apiResponseHandler({ status: 200, result: authentications[0] });
    return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Authentication not found" } });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
