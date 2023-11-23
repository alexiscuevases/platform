import { SchemaMongo } from "utilities";
import { models, model } from "mongoose";
import { CollectionSchema } from "schemas";

export const CollectionModel =
  models.Collection || model("Collection", SchemaMongo(CollectionSchema.toMongoSchemaValidations()));
