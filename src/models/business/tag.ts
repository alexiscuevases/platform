import { TagSchema } from "@schemas/models/business/tag";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const TagModel = models.Tag || model("Tag", SchemaMongo(TagSchema.toMongoSchemaValidations()));
