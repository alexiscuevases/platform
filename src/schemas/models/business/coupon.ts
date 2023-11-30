import { Coupon } from "@typescript/models/business/coupon";
import { SchemaValidator } from "@utils/schemaValidator";

export const CouponSchema = new SchemaValidator<Coupon>({
  business_id: { valueType: String, referenceModel: "Business", isRequired: true, isObjectId: true },
  status: {
    valueType: String,
    isRequired: false,
    isEnum: ["Active", "Inactive", "Archived"],
    defaultValue: "Archived"
  },
  names: { valueType: Object, isRequired: true },
  codes: { valueType: Object, isRequired: true },
  discount_type: { valueType: String, isRequired: true, isEnum: ["Percentage", "Amount"] },
  discount_value: { valueType: Number, isRequired: true },
  uses: { valueType: Number, isRequired: false, defaultValue: 0 },
  uses_limit: { valueType: Number, isRequired: false, defaultValue: null },
  uses_limit_per_customer: { valueType: Number, isRequired: false, defaultValue: null },
  expiration_date: { valueType: Date, isRequired: false, defaultValue: null, isDate: true }
});
