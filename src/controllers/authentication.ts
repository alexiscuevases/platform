import { getConfigs } from "@helpers/getConfigs";
import { createAuthentication } from "@services/authentication";
import { cookie } from "@services/cookie";
import { createVerification, getVerificationById } from "@services/verification";
import {
  CreateAuthentication_SuccessResponse,
  VerifyAuthenticationCreation_ErrorResponse
} from "@typescript/controllers/authentication";
import { CreateAuthentication } from "@typescript/models/authentication";
import { GeneralResponse } from "@typescript/others";

export class AuthenticationController {
  async create(
    dataToCreate: CreateAuthentication
  ): Promise<GeneralResponse<CreateAuthentication_SuccessResponse, CreateAuthentication>> {
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
  ): Promise<GeneralResponse<void, VerifyAuthenticationCreation_ErrorResponse>> {
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
