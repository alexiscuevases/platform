import { SchemaMongo } from "utilities";
import { models, model } from "mongoose";
import { ProviderSchema } from "schemas";

export const ProviderModel =
  models.Provider || model("Provider", SchemaMongo(ProviderSchema.toMongoSchemaValidations()));
