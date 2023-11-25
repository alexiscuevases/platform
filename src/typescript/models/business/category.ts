import { Tax, Taxes, Translations } from "@typescript/others";
import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

export interface Category extends MongooseSchemaDefaultProperties {
  business_id?: string;
  category_id?: string;
  names?: Translations;
  descriptions?: Translations;
  taxes?: Taxes;
}

export interface ParsedCategory extends MongooseSchemaDefaultProperties {
  business_id?: string;
  category_id?: string;
  name?: string;
  description?: string;
  taxes?: Tax[];
}

export interface CreateCategory {
  category_id?: string;
  names: Translations;
  descriptions?: Translations;
  taxes?: Taxes;
}

export interface UpdateCategory {
  category_id?: string;
  names?: Translations;
  descriptions?: Translations;
  taxes?: Taxes;
}
