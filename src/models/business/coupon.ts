import { CouponSchema } from "@schemas/business/coupon";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const CouponModel = models.Coupon || model("Coupon", SchemaMongo(CouponSchema.toMongoSchemaValidations()));
