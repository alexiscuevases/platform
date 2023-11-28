"use client";

import { createBusiness } from "@services/business";
import {
  CreateTokenizedCard,
  createWompiSignature,
  createWompiTransaction,
  getWompiMerchant
} from "@services/services/wompi";
import { CreateBusiness } from "@typescript/models/business";
import { TokenizeCard } from "@typescript/models/transaction";
import { User } from "@typescript/models/user";
import { GeneralErrors } from "@typescript/others";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoWallet } from "react-icons/io5";

export default function CreateBusinessComponent({
  data,
  setStep,
  user
}: {
  data: CreateBusiness;
  setStep: any;
  user: User;
}) {
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<any>>({});
  // @ts-expect-error
  const [payment, setPayment] = useState<TokenizeCard>({});
  const router = useRouter();

  const finishHandler = async () => {
    // if (waitingResponse) return;
    // setWaitingResponse(true);
    // setErrors({});

    const tokenizedCard = await CreateTokenizedCard({
      number: payment.number,
      exp_month: payment.expiration.split("/")[0],
      exp_year: payment.expiration.split("/")[1],
      cvc: payment.cvc,
      card_holder: payment.card_holder
    });

    if (!tokenizedCard.status || tokenizedCard.status !== "CREATED")
      return setErrors({ GENERAL_ERROR: "Tarjéta no válida" }), setWaitingResponse(false);

    const merchant = await getWompiMerchant();
    console.log(merchant.data.presigned_acceptance.acceptance_token);
    const transaction = await createWompiTransaction({
      acceptance_token: merchant.data.presigned_acceptance.acceptance_token,
      reference: `${new Date().getTime()}`,
      amount_in_cents: 9000000,
      currency: "COP",
      signature: await createWompiSignature(`${new Date().getTime()}`, 9000000, "COP"),
      customer_email: data.business_email,
      customer_data: {
        phone_number: data.phone_number,
        full_name:
          data.business_type === "Natural person" ?
            `${data.legal_names} ${data.legal_surnames}`
          : data.business_legal_name,
        legal_id: data.business_type === "Natural person" ? data.document_number : data.business_legal_identification,
        legal_id_type: data.business_type === "Natural person" ? data.document_type : "NIT"
      },
      payment_method: {
        type: "CARD",
        token: tokenizedCard.data.id,
        installments: 1
      }
    });

    console.log(transaction);

    // const business = await createBusiness(data);
    // if (!business.success) return setErrors(business.errors), setWaitingResponse(false);
    // router.push("/");
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
                  onChange={(event: any) => setPayment(prevState => ({ ...prevState, number: event.target.value }))}
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
                      setPayment(prevState => ({ ...prevState, expiration: event.target.value }))
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
                    id="card_cvc"
                    placeholder=" "
                    className="peer w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                    onChange={(event: any) => setPayment(prevState => ({ ...prevState, cvc: event.target.value }))}
                  />
                  <label
                    htmlFor="card_cvc"
                    className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    CVV
                  </label>
                </div>
              </div>
              <div className="group relative flex w-full rounded-2xl border">
                <input
                  type="text"
                  id="card_holder"
                  placeholder=" "
                  className="peer w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  onChange={(event: any) =>
                    setPayment(prevState => ({ ...prevState, card_holder: event.target.value }))
                  }
                />
                <label
                  htmlFor="card_holder"
                  className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  Nombre en la tarjeta
                </label>
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
            (payment.number &&
              payment.number.length === 16 &&
              payment.expiration &&
              payment.expiration.length === 5 &&
              payment.cvc &&
              payment.cvc.length >= 3 &&
              payment.cvc.length <= 4 &&
              payment.card_holder))
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
