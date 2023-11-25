"use client";

import { createBusiness } from "@services/business";
import { CreateBusiness } from "@typescript/models/business";
import { PaymenentCard } from "@typescript/models/payment";
import { GeneralErrors } from "@typescript/others";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoWallet } from "react-icons/io5";

export default function CreateBusinessComponent({ data, setStep }: { data: CreateBusiness; setStep: any }) {
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<any>>({});
  // @ts-expect-error
  const [payment, setPayment] = useState<PaymenentCard>({});
  const router = useRouter();

  const finishHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const business = await createBusiness(data);
    if (!business.success) return setErrors(business.errors), setWaitingResponse(false);

    router.push("/");
  };

  return (
    <div className="mx-auto max-w-[950px] rounded-2xl bg-white p-10 shadow-2xl">
      <h1 className="text-xl font-bold">Confirmar suscripción</h1>
      <div className="space-y-8">
        <p>
          {data.subscription_plan != "Free" ?
            "Verifique y complete la siguiente información:"
          : "¿Estás seguro de la siguiente elección?"}
        </p>
        <ul className="max-w-[500px]">
          <li className="border-b py-2 last-of-type:border-none">
            <button
              onClick={() => setStep(5)}
              type="button"
              className="group flex w-full justify-between space-x-4 rounded-2xl bg-primary bg-opacity-5 p-4 duration-200 hover:scale-[1.015]">
              <div className="flex space-x-4">
                <div className="my-auto rounded-lg bg-primary/5 p-[10px]">
                  <IoWallet className="text-2xl text-primary" />
                </div>
                <div>
                  <p className="text-left font-semibold">
                    <span className="text-primary-full-dark group-hover:text-primary-dark">Business Basic</span>{" "}
                    <span className="font-light">${new Intl.NumberFormat().format(16900)} COP</span>
                  </p>
                  <p className="text-left text-xs text-slate-600">
                    Comisión de{" "}
                    <span className="font-medium text-primary-full-dark group-hover:text-primary-dark">
                      ${new Intl.NumberFormat().format(2.9)} COP + 900%
                    </span>{" "}
                    sobre el valor de cada venta y el{" "}
                    <span className="font-medium text-primary-full-dark group-hover:text-primary-dark">IVA</span> del{" "}
                    <span className="font-medium text-primary-full-dark group-hover:text-primary-dark">19%</span> sobre
                    el valor total de la comisión.
                  </p>
                </div>
              </div>
            </button>
          </li>
        </ul>
        {data.subscription_plan != "Free" && (
          <>
            <div className="max-w-[500px] space-y-6">
              <div className="group relative flex w-full rounded-2xl border">
                <input
                  type="text"
                  id="card_number"
                  placeholder=" "
                  className="peer w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  onChange={(event: any) =>
                    setPayment(prevState => ({ ...prevState, card_number: event.target.value }))
                  }
                />
                <label
                  htmlFor="card_number"
                  className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  Número de Tarjéta Crédito/Débito
                </label>
              </div>
              <div className="flex space-x-4">
                <div className="group relative flex w-full rounded-2xl border">
                  <input
                    type="text"
                    id="card_expiration"
                    placeholder=" "
                    className="peer w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                    onChange={(event: any) =>
                      setPayment(prevState => ({ ...prevState, card_expiration: event.target.value }))
                    }
                  />
                  <label
                    htmlFor="card_expiration"
                    className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Expiración
                  </label>
                </div>
                <div className="group relative flex w-full rounded-2xl border">
                  <input
                    type="text"
                    id="card_cvv"
                    placeholder=" "
                    className="peer w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                    onChange={(event: any) => setPayment(prevState => ({ ...prevState, card_cvv: event.target.value }))}
                  />
                  <label
                    htmlFor="card_cvv"
                    className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    CVV
                  </label>
                </div>
              </div>
            </div>
            <div>
              <p className="inline-block cursor-help border-b border-dashed border-primary text-sm font-medium text-primary">
                Necesito ayuda en algo
              </p>
            </div>
          </>
        )}
        {(
          !waitingResponse &&
          (data.subscription_plan == "Free" ||
            (payment.card_number &&
              payment.card_number.length === 16 &&
              payment.card_expiration &&
              payment.card_expiration.length === 5 &&
              payment.card_cvv &&
              payment.card_cvv.length >= 3 &&
              payment.card_cvv.length <= 4))
        ) ?
          <button type="submit" onClick={() => finishHandler()} className="button button-primary">
            {data.subscription_plan == "Free" ? "Realizar registro" : "Realizar pago"}
          </button>
        : <button type="button" className="button-disabled">
            {data.subscription_plan == "Free" ? "Realizar registro" : "Realizar pago"}
          </button>
        }
      </div>
    </div>
  );
}
