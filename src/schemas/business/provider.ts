import { Provider } from "@typescript/models/business/provider";
import { SchemaValidator } from "@utils/schemaValidator";

export const ProviderSchema = new SchemaValidator<Provider>({
  business_id: { valueType: String, isRequired: true, referenceModel: "Business", isObjectId: true },
  name: { valueType: String, isRequired: true }
});
