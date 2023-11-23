"use client";

import { getBusinesses } from "services";
import { BusinessInformationInterface, CreateBusinessInterface, ErrorsInterface } from "interfaces";
import { useState } from "react";
import { getSettings } from "settings";
import { BusinessInformationValidator } from "validations";

export default function AccessInformation({
  setData,
  data,
  setStep
}: {
  setData: any;
  data: CreateBusinessInterface;
  setStep: any;
}) {
  const [errors, setErrors] = useState<ErrorsInterface<any>>({});
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  const continueHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const businessInformationValidation = BusinessInformationValidator.validate(data as BusinessInformationInterface);
    if (!businessInformationValidation.success)
      return setErrors(businessInformationValidation.errors), setWaitingResponse(false);

    const businessExists = await getBusinesses({ business_local_subdomain: data.business_local_subdomain });
    if (businessExists.success && businessExists.result[0])
      return (
        setErrors({ business_local_subdomain: "Subdominio en uso, por favor usar uno diferente" }),
        setWaitingResponse(false)
      );

    setStep(5);
  };

  return (
    <div className="mx-auto max-w-[950px] rounded-2xl bg-white px-10 py-10 shadow-2xl">
      <h1 className="text-xl font-bold">Información del negocio</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">Crea una contraseña para tu cuenta de {getSettings("platform").name}</p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[200px] space-y-6">
            <div>
              <div className="group relative w-full">
                <input
                  type="text"
                  id="business_name"
                  value={data.business_name}
                  placeholder=" "
                  className={`peer border transition-all ${
                    errors.business_name ?
                      "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                    : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                  onChange={(event: any) => {
                    setData(prevState => ({
                      ...prevState,
                      business_name: event.target.value
                    }));
                    setErrors(prevState => ({ ...prevState, business_name: undefined }));
                  }}
                />
                <label
                  htmlFor="business_name"
                  className={`absolute left-4 right-4 top-4 text-lg ${
                    errors.business_name ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                  } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                  Nombre
                </label>
              </div>
              {errors.business_name ?
                <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.business_name}</p>
              : <p className="mt-2 text-xs text-white-full-dark">Este será el nombre del negocio</p>}
            </div>
            <div>
              <div className="group relative w-full">
                <input
                  type="text"
                  id="business_local_subdomain"
                  value={data.business_local_subdomain}
                  placeholder=" "
                  className={`peer border transition-all ${
                    errors.business_local_subdomain ?
                      "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                    : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                  onChange={(event: any) => {
                    setData(prevState => ({
                      ...prevState,
                      business_local_subdomain: `${event.target.value.toLowerCase().replace(/ /g, "-")}`
                    }));
                    setErrors(prevState => ({ ...prevState, business_local_subdomain: undefined }));
                  }}
                />
                <label
                  htmlFor="business_local_subdomain"
                  className={`absolute left-4 right-4 top-4 text-lg ${
                    errors.business_local_subdomain ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                  } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                  Subdominio
                </label>
              </div>
              {errors.business_local_subdomain ?
                <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.business_local_subdomain}</p>
              : <p className="mt-2 text-xs text-white-full-dark">Este será el subdominio del negocio</p>}
            </div>
            <div>
              <div className="group relative w-full">
                <input
                  type="text"
                  id="business_email"
                  value={data.business_email}
                  placeholder=" "
                  className={`peer border transition-all ${
                    errors.business_email ?
                      "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                    : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                  onChange={(event: any) => {
                    setData(prevState => ({
                      ...prevState,
                      business_email: event.target.value
                    }));
                    setErrors(prevState => ({ ...prevState, business_email: undefined }));
                  }}
                />
                <label
                  htmlFor="business_email"
                  className={`absolute left-4 right-4 top-4 text-lg ${
                    errors.business_email ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                  } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                  Correo electrónico
                </label>
              </div>
              {errors.business_email ?
                <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.business_email}</p>
              : <p className="mt-2 text-xs text-white-full-dark">
                  Este será el correo electrónico principal del negocio
                </p>
              }
            </div>
          </div>
          {!waitingResponse && data.business_name && data.business_email ?
            <button type="submit" onClick={() => continueHandler()} className="button button-primary">
              Continuar
            </button>
          : <button type="button" className="button-disabled">
              Continuar
            </button>
          }
        </div>
      </div>
    </div>
  );
}
