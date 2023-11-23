import { SchemaValidator } from "utilities";
import { ResourceSchema } from "../resource";
import { CollectionInterface } from "interfaces";

export const CollectionSchema = new SchemaValidator<CollectionInterface>({
  business_id: { valueType: String, referenceModel: "Business", isRequired: true, isObjectId: true },
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
