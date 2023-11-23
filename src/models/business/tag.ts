import { SchemaMongo } from "utilities";
import { models, model } from "mongoose";
import { TagSchema } from "schemas";

export const TagModel = models.Tag || model("Tag", SchemaMongo(TagSchema.toMongoSchemaValidations()));
