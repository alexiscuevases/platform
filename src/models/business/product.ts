import { SchemaMongo } from "utilities";
import { models, model } from "mongoose";
import { ProductSchema } from "schemas";

export const ProductModel = models.Product || model("Product", SchemaMongo(ProductSchema.toMongoSchemaValidations()));
