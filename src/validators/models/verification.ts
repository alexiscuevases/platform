import { VerificationSchema } from "@schemas/models/verification";
import { CreateVerification } from "@typescript/models/verification";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateVerification = new SchemaValidator<CreateVerification>(
  {
    user_id: { ...VerificationSchema.getPropertyValidations("user_id") },
    type: { ...VerificationSchema.getPropertyValidations("type") }
  },
  VerificationSchema.getSchemaErrorsValidations<CreateVerification>()
);
