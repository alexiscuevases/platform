import { apiResponseHandler } from "helpers";
import { UserInterface, CreateVerificationInterface, VerificationInterface } from "interfaces";
import { NextRequest, NextResponse } from "next/server";
import { CreateVerificationValidator } from "validations";
import { UserModel, VerificationModel } from "models";
import { ConnectMongo, sendMail } from "utilities";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateVerificationInterface = await request.json();
    const validation = CreateVerificationValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const userExists: UserInterface = await UserModel.findById(body.user_id);
    if (!userExists) return apiResponseHandler({ status: 200, errors: { GENERAL_ERROR: "Usuario no existe" } });

    if (
      userExists.status === "With restrictions" &&
      ((userExists.restrictions.twoFactorAuthentication &&
        body.type === "Two factor authentication" &&
        new Date() < new Date(userExists.restrictions.twoFactorAuthentication.to_date)) ||
        (userExists.restrictions.accessRecovery &&
          body.type === "Access recovery" &&
          new Date() < new Date(userExists.restrictions.accessRecovery.to_date)))
    )
      return apiResponseHandler({
        status: 200,
        errors: {
          GENERAL_ERROR:
            "Has realializado muchos intentos. Por tu seguridad, no podrás solicitar códigos durante 1 hora"
        }
      });

    await VerificationModel.findOneAndDelete(body);

    const verification: VerificationInterface = await VerificationModel.create({
      user_id: userExists._id,
      code: `${Math.floor(100000 + Math.random() * 900000)}`,
      type: body.type,
      expiration_date: new Date().setMinutes(new Date().getMinutes() + 10)
    });

    await sendMail({
      to: userExists.email,
      subject: "Verifica que eres tú",
      body: `Tu código de seguridad es el siguiente:<br/>${verification.code}`
    });

    return apiResponseHandler({ status: 200, result: { _id: verification._id } });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
