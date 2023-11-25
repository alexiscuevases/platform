import { Tag } from "@typescript/models/business/tag";
import { SchemaValidator } from "@utils/schemaValidator";

export const TagSchema = new SchemaValidator<Tag>({
  business_id: { valueType: String, isRequired: true, referenceModel: "Business", isObjectId: true },
  name: { valueType: String, isRequired: true }
});
