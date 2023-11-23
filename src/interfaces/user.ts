import { MongoSchemaDefaultProperties } from "interfaces";

type UserTypes = "Employee" | "Investor" | "User" | "Partner";
type UserEmployeePositions = "CEO" | "CFO" | "CMO" | "COO" | "CIO" | "CTO" | "CCO" | "No employee";
type UserStatuses = "Normal" | "Restricted" | "With restrictions";
type UserRestrictionTypes = "Temporary" | "Permanent";

export interface UserRestrictionInterface {
  type: UserRestrictionTypes;
  to_date: Date;
}

interface UserRestrictions {
  accessRecovery: UserRestrictionInterface;
  twoFactorAuthentication: UserRestrictionInterface;
  access: UserRestrictionInterface;
}

export interface UserInterface extends MongoSchemaDefaultProperties {
  types?: UserTypes[];
  employee_positions?: UserEmployeePositions[];
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

export interface UserApiResponseInterface extends UserInterface {}

export interface CreateUserInterface {
  names: string;
  surnames: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ChangeUserPasswordInterface {
  password: string;
  password_confirmation: string;
}

export interface RecoveryPasswordInterface {
  email: string;
}
