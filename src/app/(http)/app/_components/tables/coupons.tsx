"use client";

import { getCouponsByBusinessId } from "@services/business/coupon";
import { Business } from "@typescript/models/business";
import { ParsedCoupon } from "@typescript/models/business/coupon";
import { SchemaParser } from "@utils/schemaParser";
import { useEffect, useState } from "react";
import { IoOpenOutline, IoTrash } from "react-icons/io5";

interface Props {
  business: Business;
}

export function CouponsTable({ business }: Props) {
  const [coupons, setCoupons] = useState<ParsedCoupon[]>([]);

  useEffect(() => {
    const Coupons = async () => {
      const response = await getCouponsByBusinessId(business._id);
      if (response.result) {
        const parsedCoupons = [];
        response.result.forEach(coupon => {
          const parsedCoupon = new SchemaParser({
            language_code: "ES",
            currency_code: "COP"
          }).parseCoupon(coupon);
          parsedCoupons.push(parsedCoupon);
        });
        setCoupons(parsedCoupons);
      }
    };

    Coupons();
  }, [business]);

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-full px-2 text-left text-sm font-bold">Cupón</th>
          <th className="w-[100px] px-2 text-left text-sm font-bold">Usos</th>
          <th className="w-[100px]"></th>
        </tr>
      </thead>
      <tbody className="w-full">
        {coupons.map((coupon, index) => (
          <tr key={index} className="group cursor-default border-t">
            <td className="flex flex-col px-2 py-2">
              <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-primary-full-dark group-hover:text-primary-dark">
                {coupon.name}
              </p>
              <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-600">
                {coupon.code}
              </p>
            </td>
            <td className="px-2">{coupon.uses}</td>
            <td className="px-2">
              <div className="flex justify-end space-x-4">
                <button className="text-slate-600 duration-200 hover:scale-110 hover:text-slate-700">
                  <IoOpenOutline size={18} />
                </button>
                <button className="text-slate-600 duration-200 hover:scale-110 hover:text-danger">
                  <IoTrash size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
