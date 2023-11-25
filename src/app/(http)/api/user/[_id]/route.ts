import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { ConnectMongo } from "@libs/mongoose";
import { UserModel } from "@models/user";
import { ChangeUserPassword } from "@typescript/models/user";
import { ValidatorToChangeUserPassword } from "@validators/user";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  _id: any;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: ChangeUserPassword = await request.json();
    const validation = ValidatorToChangeUserPassword.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const user = await UserModel.findByIdAndUpdate({ _id: params._id }, { ...body, failed_attempts: 0 });
    return apiResponseHandler({ status: 200, result: user });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
