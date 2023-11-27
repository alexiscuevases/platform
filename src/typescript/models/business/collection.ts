import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";
import { Resource } from "@typescript/models/resource";

type CollectionStatuses = "Active" | "Inactive" | "Archived";

export interface Collection extends MongooseSchemaDefaultProperties {
  business_id?: string;
  path?: string;
  products_count?: number;
  status?: CollectionStatuses;
  names?: Record<string, string>[];
  descriptions?: Record<string, string>[];
  resources?: Resource[];
}

export interface UploadCollectionResources {
  resources: Resource[];
}

export interface ParsedCollection extends MongooseSchemaDefaultProperties {
  business_id?: any;
  path?: string;
  products_count?: number;
  status?: CollectionStatuses;
  name?: string;
  description?: string;
  resources?: string[];
}

export interface CreateCollection {
  path: string;
  products_count?: number;
  status?: CollectionStatuses;
  names: Record<string, string>[];
  descriptions?: Record<string, string>[];
  resources?: Resource[];
}

export interface UpdateCollection {
  path?: string;
  products_count?: number;
  status?: CollectionStatuses;
  names?: Record<string, string>[];
  descriptions?: Record<string, string>[];
  resources?: Resource[];
}
