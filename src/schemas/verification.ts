import { VerificationInterface } from "interfaces";
import { SchemaValidator } from "utilities";

export const VerificationSchema = new SchemaValidator<VerificationInterface>({
  user_id: { valueType: String, isRequired: true, referenceModel: "User", isObjectId: true },
  type: {
    valueType: String,
    isRequired: true,
    isEnum: ["Two factor authentication", "Access recovery"]
  },
  code: { valueType: String, isRequired: true, minLength: 4, maxLength: 8 },
  failed_attemps: { valueType: Number, isRequired: false, defaultValue: 0 },
  expiration_date: { valueType: Date, isRequired: true, isDate: true }
});
