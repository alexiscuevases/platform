import { models, model } from "mongoose";
import { AuthenticationSchema } from "schemas";
import { SchemaMongo } from "utilities";

export const AuthenticationModel =
  models.Authentication || model("Authentication", SchemaMongo(AuthenticationSchema.toMongoSchemaValidations()));
