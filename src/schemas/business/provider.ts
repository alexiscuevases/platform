import { ProviderInterface } from "interfaces";
import { SchemaValidator } from "utilities";

export const ProviderSchema = new SchemaValidator<ProviderInterface>({
  business_id: { valueType: String, isRequired: true, referenceModel: "Business", isObjectId: true },
  name: { valueType: String, isRequired: true }
});
