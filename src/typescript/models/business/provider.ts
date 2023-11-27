import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

export interface Provider extends MongooseSchemaDefaultProperties {
  business_id?: any;
  products_count?: number;
  name?: string;
}

export interface CreateProvider {
  products_count?: number;
  name: string;
}

export interface UpdateProvider {
  products_count?: number;
  name: string;
}
