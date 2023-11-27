import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

export interface Tag extends MongooseSchemaDefaultProperties {
  business_id?: any;
  products_count?: number;
  name?: string;
}

export interface CreateTag {
  products_count?: number;
  name: string;
}

export interface UpdateTag {
  products_count?: number;
  name?: string;
}
