import { Category } from "@typescript/models/business/category";
import { Tax } from "@typescript/others";
import { SchemaValidator } from "@utils/schemaValidator";

const TaxSchema = new SchemaValidator<Tax>({
  tax_name: { valueType: String, isRequired: true },
  tax_percentage: { valueType: Number, isRequired: true },
  tax_included: { valueType: Boolean, isRequired: false, defaultValue: true }
});

export const CategorySchema = new SchemaValidator<Category>({
  business_id: { valueType: String, isRequired: true, referenceModel: "Business", isObjectId: true },
  category_id: {
    valueType: String,
    isRequired: false,
    referenceModel: "Category",
    isObjectId: true,
    defaultValue: null
  },
  products_count: { valueType: Number, isRequired: false, defaultValue: 0 },
  names: { valueType: Object, isRequired: true },
  descriptions: { valueType: Object, isRequired: false, defaultValue: null },
  taxes: { valueType: Map, mapOf: [TaxSchema], isRequired: false, defaultValue: () => [] }
});
