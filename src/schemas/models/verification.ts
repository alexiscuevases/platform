import { Verification } from "@typescript/models/verification";
import { SchemaValidator } from "@utils/schemaValidator";

export const VerificationSchema = new SchemaValidator<Verification>({
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
