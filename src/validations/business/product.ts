import { CreateProductInterface, UpdateProductInterface, UploadProductResourcesInterface } from "interfaces";
import { ProductSchema } from "schemas";
import { SchemaValidator } from "utilities";

export const CreateProductValidator = new SchemaValidator<CreateProductInterface>(
  {
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
  ProductSchema.getSchemaErrorsValidations<CreateProductInterface>()
);

export const UpdateProductValidator = new SchemaValidator<UpdateProductInterface>(
  {
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
  ProductSchema.getSchemaErrorsValidations<UpdateProductInterface>()
);

export const UploadProductResourcesValidator = new SchemaValidator<UploadProductResourcesInterface>(
  {
    resources: { ...ProductSchema.getPropertyValidations("resources"), isRequired: true }
  },
  ProductSchema.getSchemaErrorsValidations<UploadProductResourcesInterface>()
);
