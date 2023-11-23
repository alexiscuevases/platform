import { SchemaMongo } from "utilities";
import { models, model } from "mongoose";
import { BusinessSchema } from "schemas";

export const BusinessModel =
  models.Business || model("Business", SchemaMongo(BusinessSchema.toMongoSchemaValidations()));
