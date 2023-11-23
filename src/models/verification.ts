import { SchemaMongo } from "utilities";
import { models, model } from "mongoose";
import { VerificationSchema } from "schemas";

export const VerificationModel =
  models.Verification || model("Verification", SchemaMongo(VerificationSchema.toMongoSchemaValidations()));
