import { MongoSchemaDefaultProperties } from "interfaces";
import { UserInterface } from "./user";

export interface CreateAuthenticationInterface {
  email: string;
  password: string;
}

export interface UpdateAuthenticationInterface {
  authenticated?: boolean;
}

export interface AuthenticationInterface extends MongoSchemaDefaultProperties {
  user_id?: string;
  user?: UserInterface;
  device_ip?: string;
  device_type?: string;
  device_name?: string;
  authenticated?: boolean;
}

export interface AuthenticationApiResponseInterface extends AuthenticationInterface {}
