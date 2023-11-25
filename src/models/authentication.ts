import { AuthenticationSchema } from "@schemas/authentication";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const AuthenticationModel =
  models.Authentication || model("Authentication", SchemaMongo(AuthenticationSchema.toMongoSchemaValidations()));
