import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

export interface Tag extends MongooseSchemaDefaultProperties {
  business_id?: any;
  name?: string;
}

export interface CreateTag {
  name: string;
}

export interface UpdateTag {
  name?: string;
}
