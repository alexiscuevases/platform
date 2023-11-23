import { MongoSchemaDefaultProperties } from "interfaces";

export interface CreateTagInterface {
  name: string;
}

export interface UpdateTagInterface {
  name?: string;
}

export interface TagInterface extends MongoSchemaDefaultProperties {
  business_id?: any;
  name?: string;
}

export interface TagApiResponseInterface extends TagInterface {}
