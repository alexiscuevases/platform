import { ProviderSchema } from "@schemas/business/provider";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const ProviderModel =
  models.Provider || model("Provider", SchemaMongo(ProviderSchema.toMongoSchemaValidations()));
