import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

export interface Provider extends MongooseSchemaDefaultProperties {
  business_id?: any;
  name?: string;
}

export interface CreateProvider {
  name: string;
}

export interface UpdateProvider {
  name: string;
}
