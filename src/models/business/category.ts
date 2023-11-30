import { CategorySchema } from "@schemas/models/business/category";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const CategoryModel =
  models.Category || model("Category", SchemaMongo(CategorySchema.toMongoSchemaValidations()));
