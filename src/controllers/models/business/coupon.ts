import {
  createCouponByBusinessId,
  deleteCouponByBusinessId,
  updateCouponByBusinessId
} from "@services/business/coupon";
import { CreateCoupon, Coupon, UpdateCoupon } from "@typescript/models/business/coupon";
import { GeneralResponse } from "@typescript/others";

export class CouponController {
  async create(business_id: string, dataToCreate: CreateCoupon): Promise<GeneralResponse<Coupon, CreateCoupon>> {
    const coupon = await createCouponByBusinessId(business_id, dataToCreate);
    if (!coupon.success) return { success: false, errors: coupon.errors };

    return { success: true, result: coupon.result };
  }

  async update(
    business_id: string,
    coupon_id: string,
    dataToUpdate: UpdateCoupon
  ): Promise<GeneralResponse<Coupon, UpdateCoupon>> {
    const coupon = await updateCouponByBusinessId(business_id, coupon_id, dataToUpdate);
    if (!coupon.success) return { success: false, errors: coupon.errors };

    return { success: true, result: coupon.result };
  }

  async delete(business_id: string, coupon_id: string): Promise<GeneralResponse<void, void>> {
    const coupon = await deleteCouponByBusinessId(business_id, coupon_id);
    if (!coupon.success) return { success: false, errors: coupon.errors };

    return { success: true };
  }
}
