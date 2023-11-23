import { CreateVerificationInterface } from "interfaces";
import { SchemaValidator } from "utilities";
import { VerificationSchema } from "schemas";

export const CreateVerificationValidator = new SchemaValidator<CreateVerificationInterface>(
  {
    user_id: { ...VerificationSchema.getPropertyValidations("user_id") },
    type: { ...VerificationSchema.getPropertyValidations("type") }
  },
  VerificationSchema.getSchemaErrorsValidations<CreateVerificationInterface>()
);
