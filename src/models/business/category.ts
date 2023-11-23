import { models, model } from "mongoose";
import { CategorySchema } from "schemas";
import { SchemaMongo } from "utilities";

export const CategoryModel =
  models.Category || model("Category", SchemaMongo(CategorySchema.toMongoSchemaValidations()));
