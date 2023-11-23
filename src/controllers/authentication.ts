import {
  AuthenticationApiResponseInterface,
  CreateAuthenticationInterface,
  ResponseInterface,
  VerificationApiResponseInterface
} from "interfaces";
import { cookie, createAuthentication, createVerification, getVerificationById } from "services";
import { getSettings } from "settings";

interface CreateAuthentication_SuccessResponseInterface {
  two_factor_authentication: boolean;
  verification?: VerificationApiResponseInterface;
  authentication?: AuthenticationApiResponseInterface;
}

interface VerifyAuthenticationCreation_ErrorResponseInterface {
  code: string;
}

export class AuthenticationController {
  async create(
    dataToCreate: CreateAuthenticationInterface
  ): Promise<ResponseInterface<CreateAuthentication_SuccessResponseInterface, CreateAuthenticationInterface>> {
    const auth = await createAuthentication(dataToCreate);
    if (!auth.success) return { success: false, errors: auth.errors };

    if (!auth.result.user.two_factor_authentication) {
      await cookie({
        name: getSettings("application").cookies.authentication.name,
        value: auth.result._id,
        domain: getSettings("application").host.replace(`:${getSettings("application").port}`, "")
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
  ): Promise<ResponseInterface<void, VerifyAuthenticationCreation_ErrorResponseInterface>> {
    const verification = await getVerificationById(verification_id, {
      code
    });

    if (!verification.success) return { success: false, errors: verification.errors };

    await cookie({
      name: getSettings("application").cookies.authentication.name,
      value: authentication_id,
      domain: getSettings("application").host.replace(`:${getSettings("application").port}`, "")
    });

    return { success: true };
  }
}
