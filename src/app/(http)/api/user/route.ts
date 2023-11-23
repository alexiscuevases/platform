import { getUrlParams, apiResponseHandler } from "helpers";
import { CreateUserInterface, UserInterface } from "interfaces";
import { ConnectMongo } from "utilities";
import { UserModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { CreateUserValidator } from "validations";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateUserInterface = await request.json();
    const validation = CreateUserValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const userExists: UserInterface = await UserModel.findOne({ email: body.email });
    if (userExists)
      return apiResponseHandler<CreateUserInterface, CreateUserInterface>({
        status: 200,
        errors: { email: "Correo electrónico en uso" }
      });

    const user: UserInterface = await UserModel.create(body);
    return apiResponseHandler({ status: 200, result: user });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ConnectMongo();

    const users: UserInterface[] = await UserModel.find(getUrlParams(request.url));
    return apiResponseHandler({ status: 200, result: users });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
