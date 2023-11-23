import { MongoSchemaDefaultProperties } from "interfaces";

export interface CreateProviderInterface {
  name: string;
}

export interface UpdateProviderInterface {
  name: string;
}

export interface ProviderInterface extends MongoSchemaDefaultProperties {
  business_id?: any;
  name?: string;
}

export interface ProviderApiResponseInterface extends ProviderInterface {}
