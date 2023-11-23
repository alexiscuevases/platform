import { MongoSchemaDefaultProperties, TaxInterface, TaxesInterface, TranslationsInterface } from "interfaces";

export interface CreateCategoryInterface {
  category_id?: string;
  names: TranslationsInterface;
  descriptions?: TranslationsInterface;
  taxes?: TaxesInterface;
}

export interface CategoryInterface extends MongoSchemaDefaultProperties {
  business_id?: string;
  category_id?: string;
  names?: TranslationsInterface;
  descriptions?: TranslationsInterface;
  taxes?: TaxesInterface;
}

export interface UpdateCategoryInterface {
  category_id?: string;
  names?: TranslationsInterface;
  descriptions?: TranslationsInterface;
  taxes?: TaxesInterface;
}

export interface ParsedCategoryInterface extends MongoSchemaDefaultProperties {
  business_id?: string;
  category_id?: string;
  name?: string;
  description?: string;
  taxes?: TaxInterface[];
}

export interface CategoryApiResponseInterface extends CategoryInterface {}
