import { getUrlParams, apiResponseHandler } from "helpers";
import { VerificationInterface } from "interfaces";
import { UserModel, VerificationModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { ConnectMongo } from "utilities";

interface Params {
  _id: any;
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
  try {
    await ConnectMongo();

    const verificationExists: VerificationInterface = await VerificationModel.findById(params._id);
    if (verificationExists) {
      if (verificationExists.failed_attemps < 5) {
        if (new Date() > new Date(verificationExists.expiration_date))
          return apiResponseHandler({
            status: 200,
            errors: {
              code: "Código de verificación expirado, debes solicitar uno nuevo"
            }
          });

        if (verificationExists.code === getUrlParams(request.url).code) {
          await VerificationModel.findByIdAndDelete(verificationExists._id);

          return apiResponseHandler({
            status: 200,
            result: { code: "Verificación exitosa" }
          });
        } else {
          verificationExists.failed_attemps = verificationExists.failed_attemps + 1;
          // @ts-expect-error
          await verificationExists.save();

          if (verificationExists.failed_attemps === 5) {
            await UserModel.findByIdAndUpdate(verificationExists.user_id, {
              status: "With restrictions",
              [`restrictions.${
                verificationExists.type === "Two factor authentication" ? "twoFactorAuthentication" : "accessRecovery"
              }`]: {
                type: "Temporary",
                to_date: new Date().setHours(new Date().getHours() + 1)
              }
            });

            return apiResponseHandler({
              status: 200,
              errors: {
                code: "Has realializado muchos intentos. Por tu seguridad, no podrás solicitar códigos durante 1 hora"
              }
            });
          }
        }
      } else {
        return apiResponseHandler({
          status: 200,
          errors: {
            code: "Has realializado muchos intentos. Por tu seguridad, no podrás solicitar códigos durante 1 hora"
          }
        });
      }
    }

    return apiResponseHandler({
      status: 200,
      errors: {
        code: "Código de verificación no válido o expirado"
      }
    });
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
