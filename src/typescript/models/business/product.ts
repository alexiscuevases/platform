import { Translations } from "@typescript/others";
import { Resource } from "../resource";
import { Collection } from "./collection";
import { Tag } from "./tag";
import { Provider } from "./provider";
import { Category } from "./category";
import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

type ProductStatuses = "Active" | "Inactive" | "Archived";

export interface VariationValue {
  name: string;
}

export interface Variation {
  name: string;
  values?: VariationValue[];
}

export interface Variations {
  [key: string]: Variation[];
}

export interface PricesInterface {
  [key: string]: number;
}

export interface UploadProductResources {
  resources: Resource[];
}

export interface Product extends MongooseSchemaDefaultProperties {
  business_id?: any;
  reference?: string;
  path?: string;
  status?: ProductStatuses;
  names?: Translations;
  descriptions?: Translations;
  resources?: Resource[];
  prices?: PricesInterface;
  comparation_prices?: PricesInterface;
  costs?: PricesInterface;
  collections?: Collection[] | string[];
  tags?: Tag[] | string[];
  variations?: Variations;
  sales_tax?: boolean;
  provider?: Provider | string;
  category?: Category | string;
}

export interface ParsedProduct extends MongooseSchemaDefaultProperties {
  reference?: string;
  path?: string;
  business_id?: string;
  status?: ProductStatuses;
  name?: string;
  description?: string;
  resources?: string[];
  price?: number;
  comparation_price?: number;
  cost?: number;
  collections?: Collection[] | string[];
  tags?: Tag[] | string[];
  variations?: Variations;
  sales_tax?: boolean;
  provider?: Provider | string;
  category?: Category | string;
}

export interface CreateProduct {
  reference?: string;
  path: string;
  status?: ProductStatuses;
  names: Translations;
  descriptions: Translations;
  resources: Resource[];
  prices: PricesInterface;
  comparation_prices?: PricesInterface;
  costs?: PricesInterface;
  sales_tax?: boolean;
  provider?: any;
  category?: any;
  collections?: any[];
  tags?: any[];
  variations?: Variations;
}

export interface UpdateProduct {
  reference?: string;
  path: string;
  status?: ProductStatuses;
  names: Translations;
  descriptions: Translations;
  resources?: Resource[];
  prices: PricesInterface;
  comparation_prices?: PricesInterface;
  costs?: PricesInterface;
  collections?: Collection[] | string[];
  tags?: Tag[] | string[];
  variations?: Variations;
  sales_tax?: boolean;
  provider?: Provider | string;
  category?: Category | string;
}
