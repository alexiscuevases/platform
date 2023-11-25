import { Authentication } from "@typescript/models/authentication";
import { SchemaValidator } from "@utils/schemaValidator";

export const AuthenticationSchema = new SchemaValidator<Authentication>({
  user_id: { valueType: String, isRequired: true, referenceModel: "User", isObjectId: true },
  device_ip: { valueType: String, isRequired: true },
  device_type: { valueType: String, isRequired: true },
  device_name: { valueType: String, isRequired: true },
  authenticated: { valueType: Boolean, isRequired: false, defaultValue: true }
});
