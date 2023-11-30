import { CollectionSchema } from "@schemas/models/business/collection";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const CollectionModel =
  models.Collection || model("Collection", SchemaMongo(CollectionSchema.toMongoSchemaValidations()));
