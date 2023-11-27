import { User } from "@typescript/models/user";
import { Verification } from "@typescript/models/verification";

export interface CreateUser_SuccessResponse {
  verificationCode: string;
}

export interface CreateUser_ErrorResponse {
  email: string;
  code: string;
}

export interface RecoveryUserPassword_SuccessResponse {
  user: User;
  verification: Verification;
}

export interface VerifyUserPasswordRecovery_ErrorResponse {
  code: string;
}
