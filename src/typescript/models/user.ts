import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

type UserTypes = "Employee" | "Investor" | "User" | "Partner";
type EmployeePositions = "CEO" | "CFO" | "CMO" | "COO" | "CIO" | "CTO" | "CCO" | "No employee";
type UserStatuses = "Normal" | "Restricted" | "With restrictions";
type UserRestrictionTypes = "Temporary" | "Permanent";

export interface UserRestriction {
  type: UserRestrictionTypes;
  to_date: Date;
}

interface UserRestrictions {
  accessRecovery: UserRestriction;
  twoFactorAuthentication: UserRestriction;
  access: UserRestriction;
}

export interface User extends MongooseSchemaDefaultProperties {
  types?: UserTypes[];
  employee_positions?: EmployeePositions[];
  status?: UserStatuses;
  restrictions?: UserRestrictions;
  names?: string;
  surnames?: string;
  email?: string;
  password?: string;
  failed_attempts?: number;
  two_factor_authentication?: boolean;
  last_authentication_id?: string;
}

export interface CreateUser {
  names: string;
  surnames: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ChangeUserPassword {
  password: string;
  password_confirmation: string;
}

export interface RecoveryUserPassword {
  email: string;
}
