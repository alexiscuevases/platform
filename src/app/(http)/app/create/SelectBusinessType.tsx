"use client";

import { getConfigs } from "@helpers/getConfigs";
import { CreateBusiness } from "@typescript/models/business";
import { IoBusiness, IoPerson } from "react-icons/io5";

export default function SelectBusinessType({
  setData,
  data,
  setStep
}: {
  setData: any;
  data: CreateBusiness;
  setStep: any;
}) {
  const NextStep = business_type => {
    if (business_type === "Legal person") {
      setData(prevState => ({
        ...prevState,
        business_type,
        legal_names: undefined,
        legal_surnames: undefined,
        document_type: undefined,
        document_number: undefined
      }));
    } else {
      setData(prevState => ({
        ...prevState,
        business_type,
        business_legal_name: undefined,
        business_legal_identification: undefined
      }));
    }

    setStep(2);
  };

  return (
    <div className="mx-auto max-w-[950px] rounded-2xl bg-white p-10 shadow-2xl">
      <h1 className="text-xl font-bold">Tipo de persona</h1>
      <div className="space-y-6">
        <p>Es quien asume las obligaciones y responsabilidades del negocio a registrar</p>
        <ul className="w-full">
          {getConfigs("business").types.map((business_type: any, index: number) => (
            <li key={index}>
              {index !== 0 && <div className="mx-auto my-2 h-[1px] w-[calc(100%-32px)] bg-primary/5"></div>}
              <button
                onClick={() => NextStep(business_type.ref)}
                type="button"
                className={`group flex w-full justify-between space-x-4 duration-200 hover:scale-[1.015] ${
                  data.business_type && data.business_type == business_type.ref ?
                    "bg-primary bg-opacity-5"
                  : "hover:bg-primary hover:bg-opacity-5"
                } rounded-2xl p-4`}>
                <div className="flex space-x-4">
                  <div className="my-auto rounded-lg bg-primary/5 p-[10px]">
                    {business_type.ref == "Natural person" ?
                      <IoPerson className="text-2xl text-primary" />
                    : <IoBusiness className="text-2xl text-primary" />}
                  </div>
                  <div>
                    <p className="text-left font-semibold">
                      <span className="text-primary-full-dark group-hover:text-primary-dark">{business_type.name}</span>
                    </p>
                    <p className="text-left text-xs text-slate-600">{business_type.description}</p>
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
      </div>
    </div>
  );
}
