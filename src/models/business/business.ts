import { BusinessSchema } from "@schemas/models/business";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const BusinessModel =
  models.Business || model("Business", SchemaMongo(BusinessSchema.toMongoSchemaValidations()));
