"use client";

import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "../../_components/modals";
import { useRouter } from "next/navigation";
import { Business } from "@typescript/models/business";
import { CouponController } from "@controllers/business/coupon";
import { GeneralErrors } from "@typescript/others";
import { CreateCoupon } from "@typescript/models/business/coupon";

interface Props {
  business: Business;
}

export default function Header({ business }: Props) {
  // @ts-expect-error
  const [data, setData] = useState<CreateouponInterface>({});
  const [isOpen, setOpen] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<CreateCoupon>>({});
  const couponController = new CouponController();
  const router = useRouter();

  const handler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const response = await couponController.create(business._id, data);
    if (!response.success) return setErrors(response.errors), setWaitingResponse(false);

    setWaitingResponse(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">Cupones</h1>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="button button-primary flex items-center space-x-2">
          <IoAdd size={22} />
          <span>Nuevo cupón</span>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        action="Nuevo cupón"
        handler={handler}
        sections={[
          {
            type: "fields",
            title: "Nuevo cupón",
            fields: [
              {
                id: "names",
                title: "Nombre",
                type: "text"
              },
              {
                id: "codes",
                title: "Código",
                type: "text"
              }
            ]
          },
          {
            type: "fields",
            title: "Descuento",
            fields: [
              {
                id: "discount_type",
                title: "Tipo de descuento",
                type: "select",
                options: [
                  {
                    value: "Percentage",
                    title: "Porcentaje"
                  },
                  {
                    value: "Amount",
                    title: "Monto fijo"
                  }
                ]
              },
              {
                id: "discount_value",
                title: "Valor de descuento",
                type: "number"
              }
            ]
          },
          {
            type: "fields",
            title: "Límites y expiración",
            fields: [
              [
                {
                  id: "uses_limit",
                  title: "Límite de usos",
                  type: "number"
                },
                {
                  id: "uses_limit_per_customer",
                  title: "Límite de usos por cliente",
                  type: "number"
                }
              ],
              {
                id: "expiration_date",
                title: "Fecha de expiración",
                type: "date"
              }
            ]
          }
        ]}
        data={data}
        setData={setData}
        errors={errors}
        waitingResponse={waitingResponse}
      />
    </div>
  );
}
