"use server";

import { getConfigs } from "@helpers/getConfigs";
import { fetchData } from "@helpers/fetchData";
import { CreateCoupon, Coupon, UpdateCoupon } from "@typescript/models/business/coupon";
import { GeneralResponse } from "@typescript/others";
import { ValidatorToCreateCoupon, ValidatorToUpdateCoupon } from "@validators/models/business/coupon";

const API_ENDPOINT = getConfigs("application").URLs.api;

export const createCouponByBusinessId = async (
  business_id: string,
  dataToCreate: CreateCoupon
): Promise<GeneralResponse<Coupon, CreateCoupon>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/coupon`, "POST", dataToCreate, {
    validator: ValidatorToCreateCoupon,
    revalidateTags: [`business-${business_id}.coupons`]
  });

export const updateCouponByBusinessId = async (
  business_id: string,
  coupon_id: string,
  dataToUpdate: UpdateCoupon
): Promise<GeneralResponse<Coupon, UpdateCoupon>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/coupon/${coupon_id}`, "PUT", dataToUpdate, {
    validator: ValidatorToUpdateCoupon,
    revalidateTags: [`business-${business_id}.coupons`]
  });

export const deleteCouponByBusinessId = async (
  business_id: string,
  coupon_id: string
): Promise<GeneralResponse<void, void>> =>
  fetchData(`${API_ENDPOINT}/business/${business_id}/coupon/${coupon_id}`, "DELETE", null, {
    revalidateTags: [`business-${business_id}.coupons`]
  });

export const getCouponsByBusinessId = async (
  business_id: string,
  dataToFind?: Coupon
): Promise<GeneralResponse<Coupon[], Coupon>> => {
  const queryParams = dataToFind ? new URLSearchParams(dataToFind as any).toString() : "";
  return fetchData(`${API_ENDPOINT}/business/${business_id}/coupon?${queryParams}`, "GET", null, {
    next: { revalidate: 3600, tags: [`business-${business_id}.coupons`] }
  });
};
