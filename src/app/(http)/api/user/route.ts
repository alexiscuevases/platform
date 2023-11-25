import { apiResponseHandler } from "@helpers/apiResponseHandler";
import { getUrlParams } from "@helpers/getUrlParams";
import { ConnectMongo } from "@libs/mongoose";
import { UserModel } from "@models/user";
import { CreateUser, User } from "@typescript/models/user";
import { ValidatorToCreateUser } from "@validators/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateUser = await request.json();
    const validation = ValidatorToCreateUser.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const userExists: User = await UserModel.findOne({ email: body.email });
    if (userExists)
      return apiResponseHandler<CreateUser, CreateUser>({
        status: 200,
        errors: { email: "Correo electrónico en uso" }
      });

    const user: User = await UserModel.create(body);
    return apiResponseHandler({ status: 200, result: user });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ConnectMongo();

    const users: User[] = await UserModel.find(getUrlParams(request.url));
    return apiResponseHandler({ status: 200, result: users });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
