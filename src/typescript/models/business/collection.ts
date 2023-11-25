import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";
import { Translations } from "@typescript/others";
import { Resource } from "@typescript/models/resource";

type CollectionStatuses = "Active" | "Inactive" | "Archived";

export interface Collection extends MongooseSchemaDefaultProperties {
  business_id?: string;
  path?: string;
  status?: CollectionStatuses;
  names?: Translations;
  descriptions?: Translations;
  resource?: Resource;
}

export interface ParsedCollection extends MongooseSchemaDefaultProperties {
  business_id?: any;
  path?: string;
  status?: CollectionStatuses;
  name?: string;
  description?: string;
  resource?: string;
}

export interface CreateCollection {
  path: string;
  status?: CollectionStatuses;
  names: Translations;
  descriptions?: Translations;
  resource?: Resource;
}

export interface UpdateCollection {
  path?: string;
  status?: CollectionStatuses;
  names?: Translations;
  descriptions?: Translations;
  resource?: Resource;
}
