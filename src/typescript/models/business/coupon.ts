import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";

type CouponStatuses = "Active" | "Inactive" | "Expired" | "Archived";
type DiscountTypes = "Percentage" | "Amount";

export interface Coupon extends MongooseSchemaDefaultProperties {
  business_id?: string;
  status?: CouponStatuses;
  names?: Record<string, string>;
  codes?: Record<string, string>;
  discount_type?: DiscountTypes;
  discount_value?: number;
  uses?: number;
  uses_limit?: number;
  uses_limit_per_customer?: number;
  expiration_date?: Date;
}

export interface ParsedCoupon extends MongooseSchemaDefaultProperties {
  business_id?: string;
  status?: CouponStatuses;
  name?: string;
  code?: string;
  discount_type?: DiscountTypes;
  discount_value?: number;
  uses?: number;
  uses_limit?: number;
  uses_limit_per_customer?: number;
  expiration_date?: Date;
}

export interface CreateCoupon {
  status?: CouponStatuses;
  names: Record<string, string>;
  codes: Record<string, string>;
  discount_type: DiscountTypes;
  discount_value: number;
  uses?: number;
  uses_limit?: number;
  uses_limit_per_customer?: number;
  expiration_date?: Date;
}

export interface UpdateCoupon {
  status?: CouponStatuses;
  names?: Record<string, string>;
  codes?: Record<string, string>;
  discount_type?: DiscountTypes;
  discount_value?: number;
  uses?: number;
  uses_limit?: number;
  uses_limit_per_customer?: number;
  expiration_date?: Date;
}
