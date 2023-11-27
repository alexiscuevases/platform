import { ResourceSchema } from "@schemas/resource";
import { Collection } from "@typescript/models/business/collection";
import { SchemaValidator } from "@utils/schemaValidator";

export const CollectionSchema = new SchemaValidator<Collection>({
  business_id: { valueType: String, referenceModel: "Business", isRequired: true, isObjectId: true },
  products_count: { valueType: Number, isRequired: false, defaultValue: 0 },
  path: { valueType: String, isRequired: true, isRegex: /^[a-zA-Z0-9\-_]+$/, maxLength: 64 },
  status: {
    valueType: String,
    isRequired: false,
    isEnum: ["Active", "Inactive", "Archived"],
    defaultValue: "Archived"
  },
  names: { valueType: Object, isRequired: true },
  descriptions: { valueType: Object, isRequired: false, defaultValue: null },
  resource: { valueType: ResourceSchema, isRequired: false, defaultValue: null }
});
