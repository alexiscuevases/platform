import { User } from "@typescript/models/user";
import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

export interface Authentication extends MongooseSchemaDefaultProperties {
  user_id?: string;
  user?: User;
  device_ip?: string;
  device_type?: string;
  device_name?: string;
  authenticated?: boolean;
}

export interface CreateAuthentication {
  email: string;
  password: string;
}

export interface UpdateAuthentication {
  authenticated?: boolean;
}
