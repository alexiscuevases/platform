import { ProductSchema } from "@schemas/models/business/product";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const ProductModel = models.Product || model("Product", SchemaMongo(ProductSchema.toMongoSchemaValidations()));
