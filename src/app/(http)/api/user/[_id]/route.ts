import { apiResponseHandler } from "helpers";
import { ChangeUserPasswordInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { UserModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { ChangeUserPasswordValidator } from "validations";

interface Params {
  _id: any;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    const body: ChangeUserPasswordInterface = await request.json();
    const validation = ChangeUserPasswordValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const user = await UserModel.findByIdAndUpdate({ _id: params._id }, { ...body, failed_attempts: 0 });
    return apiResponseHandler({ status: 200, result: user });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
