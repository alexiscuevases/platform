import { getConfigs } from "@helpers/getConfigs";
import { createAuthentication } from "@services/authentication";
import { cookie } from "@services/cookie";
import { createVerification, getVerificationById } from "@services/verification";
import { Authentication, CreateAuthentication } from "@typescript/models/authentication";
import { Verification } from "@typescript/models/verification";
import { GeneralResponse } from "@typescript/others";

interface CreateAuthentication_SuccessResponseInterface {
  two_factor_authentication: boolean;
  verification?: Verification;
  authentication?: Authentication;
}

interface VerifyAuthenticationCreation_ErrorResponseInterface {
  code: string;
}

export class AuthenticationController {
  async create(
    dataToCreate: CreateAuthentication
  ): Promise<GeneralResponse<CreateAuthentication_SuccessResponseInterface, CreateAuthentication>> {
    const auth = await createAuthentication(dataToCreate);
    if (!auth.success) return { success: false, errors: auth.errors };

    if (!auth.result.user.two_factor_authentication) {
      await cookie({
        name: getConfigs("application").cookies.authentication.name,
        value: auth.result._id,
        domain: getConfigs("application").host.replace(`:${getConfigs("application").port}`, "")
      });

      return { success: true, result: { two_factor_authentication: false, authentication: auth.result } };
    }

    const verification = await createVerification({
      user_id: auth.result.user._id,
      type: "Two factor authentication"
    });
    if (!verification.success) return { success: false, errors: verification.errors };

    return {
      success: true,
      result: { two_factor_authentication: true, verification: verification.result, authentication: auth.result }
    };
  }

  async verifyCreation(
    verification_id: string,
    code: string,
    authentication_id: string
  ): Promise<GeneralResponse<void, VerifyAuthenticationCreation_ErrorResponseInterface>> {
    const verification = await getVerificationById(verification_id, {
      code
    });

    if (!verification.success) return { success: false, errors: verification.errors };

    await cookie({
      name: getConfigs("application").cookies.authentication.name,
      value: authentication_id,
      domain: getConfigs("application").host.replace(`:${getConfigs("application").port}`, "")
    });

    return { success: true };
  }
}
