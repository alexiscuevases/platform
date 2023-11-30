import { VerificationSchema } from "@schemas/models/verification";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const VerificationModel =
  models.Verification || model("Verification", SchemaMongo(VerificationSchema.toMongoSchemaValidations()));
