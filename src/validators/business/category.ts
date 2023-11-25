import { CategorySchema } from "@schemas/business/category";
import { CreateCategory, UpdateCategory } from "@typescript/models/business/category";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateCategory = new SchemaValidator<CreateCategory>(
  {
    category_id: { ...CategorySchema.getPropertyValidations("category_id") },
    names: { ...CategorySchema.getPropertyValidations("names") },
    descriptions: { ...CategorySchema.getPropertyValidations("descriptions") },
    taxes: { ...CategorySchema.getPropertyValidations("taxes") }
  },
  CategorySchema.getSchemaErrorsValidations<CreateCategory>()
);

export const ValidatorToUpdateCategory = new SchemaValidator<UpdateCategory>(
  {
    category_id: { ...CategorySchema.getPropertyValidations("category_id") },
    names: { ...CategorySchema.getPropertyValidations("names") },
    descriptions: { ...CategorySchema.getPropertyValidations("descriptions") },
    taxes: { ...CategorySchema.getPropertyValidations("taxes") }
  },
  CategorySchema.getSchemaErrorsValidations<UpdateCategory>()
);
