import { apiResponseHandler } from "helpers";
import { AuthenticationInterface, UserInterface, CreateAuthenticationInterface } from "interfaces";
import { ConnectMongo, sendMail } from "utilities";
import { AuthenticationModel, UserModel } from "models";
import { NextRequest, NextResponse } from "next/server";
import { getSettings } from "settings";
import { CreateAuthenticationValidator } from "validations";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateAuthenticationInterface = await request.json();
    const validation = CreateAuthenticationValidator.validate(body);
    if (!validation.success) return apiResponseHandler({ status: 200, errors: validation.errors });

    await ConnectMongo();

    const userExists: UserInterface = await UserModel.findOne({ email: body.email });
    if (!userExists)
      return apiResponseHandler({ status: 200, errors: { password: "Correo electrónico o contraseña no válida" } });

    if (
      userExists.status === "With restrictions" &&
      userExists.restrictions.access &&
      new Date() < new Date(userExists.restrictions.access.to_date)
    )
      return apiResponseHandler({
        status: 200,
        errors: {
          GENERAL_ERROR:
            "Has realializado muchos intentos. Por tu seguridad, no podrás acceder durante 1 hora, a menos que cambies la contraseña"
        }
      });

    if (userExists.password === body.password) {
      let authentication: AuthenticationInterface = await AuthenticationModel.findOneAndUpdate(
        {
          user_id: userExists._id,
          device_ip: request.headers.get("x-forwarded-for"),
          device_type: "Desconocido",
          device_name: "Desconocido"
        },
        {
          authenticated: true
        }
      );

      if (!authentication)
        authentication = await AuthenticationModel.create({
          user_id: userExists._id,
          device_ip: request.headers.get("x-forwarded-for"),
          device_type: "Desconocido",
          device_name: "Desconocido"
        });

      userExists.failed_attempts = 0;
      userExists.last_authentication_id = authentication._id;
      // @ts-expect-error
      await userExists.save();

      // @ts-expect-error
      return apiResponseHandler({ status: 200, result: { ...authentication._doc, user: userExists } });
    } else {
      userExists.failed_attempts += 1;
      // @ts-expect-error
      await userExists.save();

      if (userExists.failed_attempts === 5) {
        sendMail({
          to: userExists.email,
          subject: `Su cuenta de ${getSettings("platform").name} ha sido bloqueada`,
          body: `Hola ${userExists.names}, su cuenta de ${getSettings("platform").name} ha sido bloqueada por seguridad`
        });

        await UserModel.findByIdAndUpdate(userExists._id, {
          status: "With restrictions",
          "restrictions.access": {
            type: "Temporary",
            to_date: new Date().setHours(new Date().getHours() + 1)
          }
        });

        return apiResponseHandler({
          status: 200,
          errors: {
            password:
              "Has realializado muchos intentos. Por tu seguridad, no podrás acceder durante 1 hora, a menos que cambies la contraseña"
          }
        });
      } else {
        return apiResponseHandler({ status: 200, errors: { password: "Correo electrónico o contraseña no válida" } });
      }
    }
  } catch (e: any) {
    return apiResponseHandler({ status: 500, errors: { GENERAL_ERROR: e.message } });
  }
}
