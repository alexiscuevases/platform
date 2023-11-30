import { Tag } from "@typescript/models/business/tag";
import { SchemaValidator } from "@utils/schemaValidator";

export const TagSchema = new SchemaValidator<Tag>({
  business_id: { valueType: String, isRequired: true, referenceModel: "Business", isObjectId: true },
  products_count: { valueType: Number, isRequired: false, defaultValue: 0 },
  name: { valueType: String, isRequired: true }
});
