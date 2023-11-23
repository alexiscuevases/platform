import { TagInterface } from "interfaces";
import { SchemaValidator } from "utilities";

export const TagSchema = new SchemaValidator<TagInterface>({
  business_id: { valueType: String, isRequired: true, referenceModel: "Business", isObjectId: true },
  name: { valueType: String, isRequired: true }
});
