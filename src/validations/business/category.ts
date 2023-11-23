import { CreateCategoryInterface, UpdateCategoryInterface } from "interfaces";
import { SchemaValidator } from "utilities";
import { CategorySchema } from "schemas";

export const CreateCategoryValidator = new SchemaValidator<CreateCategoryInterface>(
  {
    category_id: { ...CategorySchema.getPropertyValidations("category_id") },
    names: { ...CategorySchema.getPropertyValidations("names") },
    descriptions: { ...CategorySchema.getPropertyValidations("descriptions") },
    taxes: { ...CategorySchema.getPropertyValidations("taxes") }
  },
  CategorySchema.getSchemaErrorsValidations<CreateCategoryInterface>()
);

export const UpdateCategoryValidator = new SchemaValidator<UpdateCategoryInterface>(
  {
    category_id: { ...CategorySchema.getPropertyValidations("category_id") },
    names: { ...CategorySchema.getPropertyValidations("names") },
    descriptions: { ...CategorySchema.getPropertyValidations("descriptions") },
    taxes: { ...CategorySchema.getPropertyValidations("taxes") }
  },
  CategorySchema.getSchemaErrorsValidations<UpdateCategoryInterface>()
);
