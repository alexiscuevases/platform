import { MongoSchemaDefaultProperties, ResourceInterface, TranslationsInterface } from "interfaces";

type CollectionStatuses = "Active" | "Inactive" | "Archived";

export interface CollectionInterface extends MongoSchemaDefaultProperties {
  business_id?: string;
  path?: string;
  status?: CollectionStatuses;
  names?: TranslationsInterface;
  descriptions?: TranslationsInterface;
  resource?: ResourceInterface;
}

export interface CollectionApiResponseInterface extends CollectionInterface {}

export interface ParsedCollectionInterface extends MongoSchemaDefaultProperties {
  business_id?: any;
  path?: string;
  status?: CollectionStatuses;
  name?: string;
  description?: string;
  resource?: string;
}

export interface CreateCollectionInterface {
  path: string;
  status?: CollectionStatuses;
  names: TranslationsInterface;
  descriptions?: TranslationsInterface;
  resource?: ResourceInterface;
}

export interface UpdateCollectionInterface {
  path?: string;
  status?: CollectionStatuses;
  names?: TranslationsInterface;
  descriptions?: TranslationsInterface;
  resource?: ResourceInterface;
}
