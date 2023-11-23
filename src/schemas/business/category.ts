import { CategoryInterface, TaxInterface } from "interfaces";
import { SchemaValidator } from "utilities";

const TaxSchema = new SchemaValidator<TaxInterface>({
  tax_name: { valueType: String, isRequired: true },
  tax_percentage: { valueType: Number, isRequired: true },
  tax_included: { valueType: Boolean, isRequired: false, defaultValue: true }
});

export const CategorySchema = new SchemaValidator<CategoryInterface>({
  business_id: { valueType: String, isRequired: true, referenceModel: "Business", isObjectId: true },
  category_id: {
    valueType: String,
    isRequired: false,
    referenceModel: "Category",
    isObjectId: true,
    defaultValue: null
  },
  names: { valueType: Object, isRequired: true },
  descriptions: { valueType: Object, isRequired: false, defaultValue: null },
  taxes: { valueType: Map, mapOf: TaxSchema, isRequired: false, defaultValue: () => {} }
});
