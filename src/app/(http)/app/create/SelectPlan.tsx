"use client";

import { getConfigs } from "@helpers/getConfigs";
import { CreateBusiness } from "@typescript/models/business";
import Link from "next/link";
import { IoWallet } from "react-icons/io5";

export default function SelectPlan({ setData, data, setStep }: { setData: any; data: CreateBusiness; setStep: any }) {
  const continueHanlder = plan_ref => {
    setData(prevState => ({ ...prevState, subscription_plan: plan_ref }));
    setStep(6);
  };

  return (
    <div className="mx-auto max-w-[950px] rounded-2xl bg-white px-8 py-10 shadow-2xl">
      <h1 className="px-4 text-xl font-bold">Suscríbase a un plan</h1>
      <div className="space-y-6">
        <p className="px-4">Selecciona el plan más adecuado a sus necesidades:</p>
        <ul className="w-full">
          {Object.keys(getConfigs("platform").plans).map(plan => (
            <li key={plan}>
              {plan !== "Free" && <div className="mx-auto my-2 h-[1px] w-[calc(100%-32px)] bg-primary/5"></div>}
              <button
                onClick={() => continueHanlder(plan)}
                type="button"
                className={`group flex w-full justify-between space-x-4 duration-200 hover:scale-[1.015] ${
                  data.subscription_plan && data.subscription_plan == plan ?
                    "bg-primary bg-opacity-5"
                  : "hover:bg-primary hover:bg-opacity-5"
                } rounded-2xl p-4`}>
                <div className="flex space-x-4">
                  <div className="my-auto rounded-lg bg-primary/5 p-[10px]">
                    <IoWallet className="text-2xl text-primary" />
                  </div>
                  <div>
                    <p className="text-left font-semibold">
                      <span className="text-primary-full-dark group-hover:text-primary-dark">
                        {getConfigs("platform").plans[plan].name}
                      </span>{" "}
                      <span className="font-light">
                        ${new Intl.NumberFormat().format(getConfigs("platform").plans[plan].costs.monthly_price)} COP
                      </span>
                    </p>
                    <p className="text-left text-xs text-slate-600">
                      Comisión de{" "}
                      <span className="font-medium text-primary-full-dark group-hover:text-primary-dark">
                        ${new Intl.NumberFormat().format(getConfigs("platform").plans[plan].costs.fixed_commission)} COP
                        + {getConfigs("platform").plans[plan].costs.variable_commission}%
                      </span>{" "}
                      sobre el valor de cada venta y el{" "}
                      <span className="font-medium text-primary-full-dark group-hover:text-primary-dark">IVA</span> del{" "}
                      <span className="font-medium text-primary-full-dark group-hover:text-primary-dark">19%</span>{" "}
                      sobre el valor total de la comisión.
                    </p>
                  </div>
                </div>
                <div>
                  <svg viewBox="0 0 24 24" fill="#4840bb" role="presentation" className="h-8">
                    <path d="M9.97 6.47a.75.75 0 000 1.06l3.762 3.763a1 1 0 010 1.414L9.97 16.47a.75.75 0 001.061 1.06l5-5a.749.749 0 000-1.06l-5-5a.75.75 0 00-1.061 0z" />
                  </svg>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <Link href="/prices" className="group relative inline-block text-sm text-primary">
          Consulta las características de cada plan
          <div className="absolute -bottom-0.5 left-0 right-0 h-[1px] w-0 bg-primary transition-all group-hover:w-full" />
        </Link>
      </div>
    </div>
  );
}
