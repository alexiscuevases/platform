import { ResourceSchema } from "@schemas/resource";
import { Product } from "@typescript/models/business/product";
import { SchemaValidator } from "@utils/schemaValidator";

export const ProductSchema = new SchemaValidator<Product>({
  business_id: { valueType: String, referenceModel: "Business", isRequired: true, isObjectId: true },
  path: { valueType: String, isRequired: true, isRegex: /^[a-zA-Z0-9\-_]+$/, maxLength: 64 },
  status: {
    valueType: String,
    isRequired: false,
    isEnum: ["Active", "Inactive", "Archived"],
    defaultValue: "Archived"
  },
  names: { valueType: Object, isRequired: true },
  descriptions: { valueType: Object, isRequired: true },
  resources: { valueType: [ResourceSchema], isRequired: false, defaultValue: [] },
  prices: { valueType: Object, isRequired: true },
  comparation_prices: { valueType: Object, isRequired: false, defaultValue: () => {} },
  costs: { valueType: Object, isRequired: false, defaultValue: () => {} },
  variations: { valueType: Object, isRequired: false, defaultValue: () => {} },
  category: { valueType: String, isRequired: false, referenceModel: "Category", isObjectId: true, defaultValue: null },
  provider: { valueType: String, isRequired: false, referenceModel: "Provider", isObjectId: true, defaultValue: null },
  collections: { valueType: [String], isRequired: false, referenceModel: "Collection", defaultValue: [] },
  tags: { valueType: [String], isRequired: false, referenceModel: "Tag", defaultValue: [] },
  sales_tax: { valueType: Boolean, isRequired: false, defaultValue: false }
});
