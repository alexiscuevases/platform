import { Authentication } from "@typescript/models/authentication";
import { Verification } from "@typescript/models/verification";

export interface CreateAuthentication_SuccessResponse {
  two_factor_authentication: boolean;
  verification?: Verification;
  authentication?: Authentication;
}

export interface VerifyAuthenticationCreation_ErrorResponse {
  code: string;
}
