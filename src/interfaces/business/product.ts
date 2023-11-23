import {
  CollectionInterface,
  TranslationsInterface,
  ResourceInterface,
  MongoSchemaDefaultProperties,
  TagInterface,
  ProviderInterface,
  CategoryInterface
} from "interfaces";

type ProductStatuses = "Active" | "Inactive" | "Archived";

interface VariationInterface {
  name: string;
  values?: {
    name: string;
  }[];
}

export interface VariationsInterface {
  [key: string]: VariationInterface[];
}

export interface PricesInterface {
  [key: string]: number;
}

export interface CreateProductInterface {
  path: string;
  status?: ProductStatuses;
  names: TranslationsInterface;
  descriptions: TranslationsInterface;
  resources: ResourceInterface[];
  prices: PricesInterface;
  comparation_prices?: PricesInterface;
  costs?: PricesInterface;
  sales_tax?: boolean;
  provider?: any;
  category?: any;
  collections?: any[];
  tags?: any[];
  variations?: VariationsInterface;
}

export interface UpdateProductInterface {
  path: string;
  status?: ProductStatuses;
  names: TranslationsInterface;
  descriptions: TranslationsInterface;
  resources?: ResourceInterface[];
  prices: PricesInterface;
  comparation_prices?: PricesInterface;
  costs?: PricesInterface;
  collections?: CollectionInterface[] | string[];
  tags?: TagInterface[] | string[];
  variations?: VariationsInterface;
  sales_tax?: boolean;
  provider?: ProviderInterface | string;
  category?: CategoryInterface | string;
}

export interface UploadProductResourcesInterface {
  resources: ResourceInterface[];
}

export interface ProductInterface extends MongoSchemaDefaultProperties {
  business_id?: any;
  path?: string;
  status?: ProductStatuses;
  names?: TranslationsInterface;
  descriptions?: TranslationsInterface;
  resources?: ResourceInterface[];
  prices?: PricesInterface;
  comparation_prices?: PricesInterface;
  costs?: PricesInterface;
  collections?: CollectionInterface[] | string[];
  tags?: TagInterface[] | string[];
  variations?: VariationsInterface;
  sales_tax?: boolean;
  provider?: ProviderInterface | string;
  category?: CategoryInterface | string;
}

export interface ParsedProductInterface extends MongoSchemaDefaultProperties {
  path?: string;
  business_id?: string;
  status?: ProductStatuses;
  name?: string;
  description?: string;
  resources?: string[];
  price?: number;
  comparation_price?: number;
  cost?: number;
  collections?: CollectionInterface[] | string[];
  tags?: TagInterface[] | string[];
  variations?: VariationsInterface;
  sales_tax?: boolean;
  provider?: ProviderInterface | string;
  category?: CategoryInterface | string;
}

export interface ProductApiResponseInterface extends ProductInterface {}
