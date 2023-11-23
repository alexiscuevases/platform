import { AuthenticationInterface } from "interfaces";
import { SchemaValidator } from "utilities";

export const AuthenticationSchema = new SchemaValidator<AuthenticationInterface>({
  user_id: { valueType: String, isRequired: true, referenceModel: "User", isObjectId: true },
  device_ip: { valueType: String, isRequired: true },
  device_type: { valueType: String, isRequired: true },
  device_name: { valueType: String, isRequired: true },
  authenticated: { valueType: Boolean, isRequired: false, defaultValue: true }
});
