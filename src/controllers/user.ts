import { sendMail } from "@libs/nodemailer";
import { changeUserPassword, createUser, getUsers } from "@services/user";
import { createVerification, getVerificationById } from "@services/verification";
import { ChangeUserPassword, CreateUser, RecoveryUserPassword, User } from "@typescript/models/user";
import { Verification } from "@typescript/models/verification";
import { GeneralResponse } from "@typescript/others";
import { Validator } from "@utils/validator";

const validation = new Validator();

interface Create_SuccessResponseInterface {
  verificationCode: string;
}

interface Create_ErrorResponseInterface {
  email: string;
  code: string;
}

interface RecoveryPassword_SuccessResponseInterface {
  user: User;
  verification: Verification;
}

interface VerifyPasswordRecovery_ErrorResponseInterface {
  code: string;
}

export class UserController {
  async verifyCreation(
    email: string
  ): Promise<GeneralResponse<Create_SuccessResponseInterface, Create_ErrorResponseInterface>> {
    if (!validation.isEmail(email))
      return { success: false, errors: { email: "Correo electrónico no válido, por favor ingrese uno diferente" } };

    const users = await getUsers({ email: email });
    if (users.result && users.result[0])
      return { success: false, errors: { email: "Correo electrónico en uso, por favor ingrese uno diferente" } };

    const verificationCode = `${Math.floor(100000 + Math.random() * 900000)}`;
    const mail = await sendMail({
      to: email,
      subject: "Verifica que eres tú",
      body: `Tu código de seguridad es el siguiente:<br/>${verificationCode}`
    });
    if (!mail.success)
      return {
        success: false,
        errors: {
          code: "Ops, no pudimos envíarte el código de verificación, Por favor vuelve a envíarlo"
        }
      };

    return { success: true, result: { verificationCode } };
  }

  async create(dataToCreate: CreateUser): Promise<GeneralResponse<void, CreateUser>> {
    const user = await createUser(dataToCreate);
    if (!user.success) return { success: false, errors: user.errors };

    return { success: true };
  }

  async recoveryPassword(
    data: RecoveryUserPassword
  ): Promise<GeneralResponse<RecoveryPassword_SuccessResponseInterface, RecoveryUserPassword>> {
    if (!validation.isEmail(data.email)) return { success: false, errors: { email: "Correo electrónico no válido" } };

    const userExists = await getUsers({ email: data.email });
    if (userExists.success && userExists.result[0]) {
      const verification = await createVerification({
        user_id: userExists.result[0]._id,
        type: "Access recovery"
      });
      if (!verification.success) return { success: false, errors: verification.errors };

      return { success: true, result: { user: userExists.result[0], verification: verification.result } };
    }

    return { success: false, errors: { email: "Correo electrónico no registrado" } };
  }

  async verifyPasswordRecovery(
    verification_id: string,
    code: string
  ): Promise<GeneralResponse<void, VerifyPasswordRecovery_ErrorResponseInterface>> {
    const verification = await getVerificationById(verification_id, {
      code
    });

    if (!verification.success) return { success: false, errors: verification.errors };
    return { success: true };
  }

  async changePassword(user_id: string, data: ChangeUserPassword): Promise<GeneralResponse<void, ChangeUserPassword>> {
    const userUpdated = await changeUserPassword(user_id, {
      password: data.password,
      password_confirmation: data.password_confirmation
    });
    if (!userUpdated.success) return { success: false, errors: userUpdated.errors };

    return { success: true };
  }
}
