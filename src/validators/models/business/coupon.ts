import { CouponSchema } from "@schemas/models/business/coupon";
import { CreateCoupon, UpdateCoupon } from "@typescript/models/business/coupon";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateCoupon = new SchemaValidator<CreateCoupon>(
  {
    status: { ...CouponSchema.getPropertyValidations("status") },
    names: { ...CouponSchema.getPropertyValidations("names") },
    codes: { ...CouponSchema.getPropertyValidations("codes") },
    discount_type: { ...CouponSchema.getPropertyValidations("discount_type") },
    discount_value: { ...CouponSchema.getPropertyValidations("discount_value") },
    uses: { ...CouponSchema.getPropertyValidations("uses") },
    uses_limit: { ...CouponSchema.getPropertyValidations("uses_limit") },
    uses_limit_per_customer: { ...CouponSchema.getPropertyValidations("uses_limit_per_customer") },
    expiration_date: { ...CouponSchema.getPropertyValidations("expiration_date") }
  },
  CouponSchema.getSchemaErrorsValidations<CreateCoupon>()
);

export const ValidatorToUpdateCoupon = new SchemaValidator<UpdateCoupon>(
  {
    status: { ...CouponSchema.getPropertyValidations("status") },
    names: { ...CouponSchema.getPropertyValidations("names") },
    codes: { ...CouponSchema.getPropertyValidations("codes") },
    discount_type: { ...CouponSchema.getPropertyValidations("discount_type") },
    discount_value: { ...CouponSchema.getPropertyValidations("discount_value") },
    uses: { ...CouponSchema.getPropertyValidations("uses") },
    uses_limit: { ...CouponSchema.getPropertyValidations("uses_limit") },
    uses_limit_per_customer: { ...CouponSchema.getPropertyValidations("uses_limit_per_customer") },
    expiration_date: { ...CouponSchema.getPropertyValidations("expiration_date") }
  },
  CouponSchema.getSchemaErrorsValidations<UpdateCoupon>()
);
