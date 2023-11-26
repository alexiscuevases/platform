import { ProductSchema } from "@schemas/business/product";
import { CreateProduct, UpdateProduct, UploadProductResources } from "@typescript/models/business/product";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateProduct = new SchemaValidator<CreateProduct>(
  {
    reference: { ...ProductSchema.getPropertyValidations("reference") },
    path: { ...ProductSchema.getPropertyValidations("path") },
    status: { ...ProductSchema.getPropertyValidations("status") },
    names: { ...ProductSchema.getPropertyValidations("names") },
    descriptions: { ...ProductSchema.getPropertyValidations("descriptions") },
    prices: { ...ProductSchema.getPropertyValidations("prices") },
    resources: { ...ProductSchema.getPropertyValidations("resources") },
    collections: { ...ProductSchema.getPropertyValidations("collections") },
    comparation_prices: { ...ProductSchema.getPropertyValidations("comparation_prices") },
    costs: { ...ProductSchema.getPropertyValidations("costs") },
    variations: { ...ProductSchema.getPropertyValidations("variations") },
    category: { ...ProductSchema.getPropertyValidations("category") },
    provider: { ...ProductSchema.getPropertyValidations("provider") },
    tags: { ...ProductSchema.getPropertyValidations("tags") },
    sales_tax: { ...ProductSchema.getPropertyValidations("sales_tax") }
  },
  ProductSchema.getSchemaErrorsValidations<CreateProduct>()
);

export const ValidatorToUpdateProduct = new SchemaValidator<UpdateProduct>(
  {
    reference: { ...ProductSchema.getPropertyValidations("reference") },
    path: { ...ProductSchema.getPropertyValidations("path") },
    status: { ...ProductSchema.getPropertyValidations("status") },
    names: { ...ProductSchema.getPropertyValidations("names") },
    descriptions: { ...ProductSchema.getPropertyValidations("descriptions") },
    prices: { ...ProductSchema.getPropertyValidations("prices") },
    resources: { ...ProductSchema.getPropertyValidations("resources") },
    collections: { ...ProductSchema.getPropertyValidations("collections") },
    comparation_prices: { ...ProductSchema.getPropertyValidations("comparation_prices") },
    costs: { ...ProductSchema.getPropertyValidations("costs") },
    variations: { ...ProductSchema.getPropertyValidations("variations") },
    category: { ...ProductSchema.getPropertyValidations("category") },
    provider: { ...ProductSchema.getPropertyValidations("provider") },
    tags: { ...ProductSchema.getPropertyValidations("tags") },
    sales_tax: { ...ProductSchema.getPropertyValidations("sales_tax") }
  },
  ProductSchema.getSchemaErrorsValidations<UpdateProduct>()
);

export const ValidatorToUploadProductResources = new SchemaValidator<UploadProductResources>(
  {
    resources: { ...ProductSchema.getPropertyValidations("resources"), isRequired: true }
  },
  ProductSchema.getSchemaErrorsValidations<UploadProductResources>()
);
