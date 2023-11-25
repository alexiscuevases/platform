"use client";

import { Address, CreateBusiness, LegalPerson, NaturalPerson } from "@typescript/models/business";
import { GeneralErrors } from "@typescript/others";
import { BusinessAddressValidator, LegalPersonValidator, NaturalPersonValidator } from "@validators/business";
import { useState } from "react";

export default function AccessInformation({
  setData,
  data,
  setStep,
  step
}: {
  setData: any;
  data: CreateBusiness;
  setStep: any;
  step: any;
}) {
  const [errors, setErrors] = useState<GeneralErrors<any>>({});

  const continueHandler = () => {
    if (step == 2) {
      setErrors({});

      if (data.business_type === "Natural person") {
        const naturalPersonValidation = NaturalPersonValidator.validate(data as NaturalPerson);
        if (!naturalPersonValidation.success) return setErrors(naturalPersonValidation.errors);
      } else {
        const legalPersonValidation = LegalPersonValidator.validate(data as LegalPerson);
        if (!legalPersonValidation.success) return setErrors(legalPersonValidation.errors);
      }

      setStep(3);
    } else {
      const legalAddressValidation = BusinessAddressValidator.validate(data as Address);
      if (!legalAddressValidation.success) return setErrors(legalAddressValidation.errors);

      setStep(4);
    }
  };

  return (
    <div className="mx-auto max-w-[950px] rounded-2xl bg-white px-10 py-10 shadow-2xl">
      {step == 2 && (
        <>
          {data.business_type == "Natural person" ?
            <>
              <h1 className="text-xl font-bold">Información legal</h1>
              <div className="space-y-6">
                <p className="text-white-full-dark">
                  Registrarás el negocio a nombre de una persona natural. Por favor proporciona la siguiente
                  información:
                </p>
                <div className="max-w-[500px] space-y-8">
                  <div className="min-h-[200px] space-y-6">
                    <div>
                      <div className="group relative w-full">
                        <input
                          type="text"
                          id="legal_names"
                          value={data.legal_names}
                          placeholder=" "
                          className={`peer border transition-all ${
                            errors.legal_names ?
                              "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                            : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                          } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                          onChange={(event: any) => {
                            setData(prevState => ({ ...prevState, legal_names: event.target.value }));
                            setErrors(prevState => ({ ...prevState, legal_names: undefined }));
                          }}
                        />
                        <label
                          htmlFor="legal_names"
                          className={`absolute left-4 right-4 top-4 text-lg ${
                            errors.legal_names ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                          } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                          Nombres
                        </label>
                      </div>
                      {errors.legal_names ?
                        <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.legal_names}</p>
                      : <p className="mt-2 text-xs text-white-full-dark">
                          Nombres tal cúal aparecen en el documento de identidad
                        </p>
                      }
                    </div>
                    <div>
                      <div className="group relative w-full">
                        <input
                          type="text"
                          id="legal_surnames"
                          value={data.legal_surnames}
                          placeholder=" "
                          className={`peer border transition-all ${
                            errors.legal_surnames ?
                              "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                            : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                          } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                          onChange={(event: any) => {
                            setData(prevState => ({ ...prevState, legal_surnames: event.target.value }));
                            setErrors(prevState => ({ ...prevState, legal_surnames: undefined }));
                          }}
                        />
                        <label
                          htmlFor="legal_surnames"
                          className={`absolute left-4 right-4 top-4 text-lg ${
                            errors.legal_surnames ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                          } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                          Apellidos
                        </label>
                      </div>
                      {errors.legal_surnames ?
                        <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.legal_surnames}</p>
                      : <p className="mt-2 text-xs text-white-full-dark">
                          Apellidos tal cúal aparecen en el documento de identidad
                        </p>
                      }
                    </div>
                    <div className="group relative">
                      <select
                        id="document_type"
                        className="peer h-[60px] w-full cursor-pointer rounded-2xl border px-3 pb-2 pt-6 text-lg outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                        onChange={(event: any) =>
                          setData(prevState => ({ ...prevState, document_type: event.target.value }))
                        }>
                        {data.document_type ?
                          <option value={data.document_type}>{data.document_type}</option>
                        : <option value="">- Selecciona una opción -</option>}
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                      </select>
                      <label
                        htmlFor="document_type"
                        className="absolute left-4 right-4 top-4 cursor-pointer text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                        Tipo de documento
                      </label>
                    </div>
                    <div>
                      <div className="group relative w-full">
                        <input
                          type="text"
                          id="document_number"
                          value={data.document_number}
                          placeholder=" "
                          className={`peer border transition-all ${
                            errors.document_number ?
                              "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                            : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                          } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                          onChange={(event: any) => {
                            setData(prevState => ({ ...prevState, document_number: event.target.value }));
                            setErrors(prevState => ({ ...prevState, document_number: undefined }));
                          }}
                        />
                        <label
                          htmlFor="document_number"
                          className={`absolute left-4 right-4 top-4 text-lg ${
                            errors.document_number ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                          } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                          Número de documento
                        </label>
                      </div>
                      {errors.document_number && (
                        <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.document_number}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="inline-block cursor-help border-b border-dashed border-primary text-sm text-primary">
                      ¿Por qué necesitan esta información?
                    </p>
                  </div>
                  {data.legal_names && data.legal_surnames && data.document_type && data.document_number ?
                    <button
                      type="submit"
                      className="rounded-2xl bg-primary px-6 py-3 text-lg font-bold text-white duration-200 hover:scale-[1.015] hover:bg-primary-dark active:scale-95"
                      onClick={() => continueHandler()}>
                      Continuar
                    </button>
                  : <button
                      type="button"
                      className="cursor-not-allowed rounded-2xl bg-white-full-dark bg-opacity-20 px-6 py-3 text-lg font-bold text-white">
                      Continuar
                    </button>
                  }
                </div>
              </div>
            </>
          : <>
              <h1 className="text-xl font-bold">Información legal</h1>
              <div className="space-y-6">
                <p className="text-white-full-dark">
                  Registrarás el negocio a nombre de una persona jurídica. Por favor proporciona la siguiente
                  información:
                </p>
                <div className="max-w-[500px] space-y-8">
                  <div className="min-h-[200px] space-y-6">
                    <div>
                      <div className="group relative w-full">
                        <input
                          type="text"
                          id="business_legal_name"
                          value={data.business_legal_name}
                          placeholder=" "
                          className={`peer border transition-all ${
                            errors.business_legal_name ?
                              "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                            : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                          } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                          onChange={(event: any) => {
                            setData(prevState => ({ ...prevState, business_legal_name: event.target.value }));
                            setErrors(prevState => ({ ...prevState, business_legal_name: undefined }));
                          }}
                        />
                        <label
                          htmlFor="business_legal_name"
                          className={`absolute left-4 right-4 top-4 text-lg ${
                            errors.business_legal_name ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                          } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                          Nombre legal
                        </label>
                      </div>
                      {errors.business_legal_name ?
                        <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.business_legal_name}</p>
                      : <p className="mt-2 text-xs text-white-full-dark">Nombre legal de la persona jurídica</p>}
                    </div>
                    <div>
                      <div className="group relative w-full">
                        <input
                          type="text"
                          id="business_legal_identification"
                          value={data.business_legal_identification}
                          placeholder=" "
                          className={`peer border transition-all ${
                            errors.business_legal_identification ?
                              "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                            : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                          } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                          onChange={(event: any) => {
                            setData(prevState => ({
                              ...prevState,
                              business_legal_identification: event.target.value
                            }));
                            setErrors(prevState => ({ ...prevState, business_legal_identification: undefined }));
                          }}
                        />
                        <label
                          htmlFor="business_legal_identification"
                          className={`absolute left-4 right-4 top-4 text-lg ${
                            errors.business_legal_identification ? "text-[hsla(353,100%,35%,1)]" : (
                              "text-white-full-dark"
                            )
                          } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                          Identificación legal
                        </label>
                      </div>
                      {errors.business_legal_identification ?
                        <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">
                          {errors.business_legal_identification}
                        </p>
                      : <p className="mt-2 text-xs text-white-full-dark">
                          Número de identificación legal de la persona jurídica
                        </p>
                      }
                    </div>
                  </div>
                  <div>
                    <p className="inline-block cursor-help border-b border-dashed border-primary text-sm text-primary">
                      ¿Por qué necesitan esta información?
                    </p>
                  </div>
                  {data.business_legal_name && data.business_legal_identification ?
                    <button
                      type="submit"
                      className="rounded-2xl bg-primary px-6 py-3 text-lg font-bold text-white duration-200 hover:scale-[1.015] hover:bg-primary-dark active:scale-95"
                      onClick={() => continueHandler()}>
                      Continuar
                    </button>
                  : <button
                      type="button"
                      className="cursor-not-allowed rounded-2xl bg-white-full-dark bg-opacity-20 px-6 py-3 text-lg font-bold text-white">
                      Continuar
                    </button>
                  }
                </div>
              </div>
            </>
          }
        </>
      )}
      {step == 3 && (
        <>
          <h1 className="text-xl font-bold">Domicilio legal</h1>
          <div className="space-y-6">
            <p className="text-white-full-dark">
              Necesitamos otros datos. Por favor proporciona la siguiente información:
            </p>
            <div className="max-w-[500px] space-y-8">
              <div className="min-h-[200px] space-y-6">
                <div className="group relative">
                  <select
                    id="country_code"
                    className="peer h-[60px] w-full cursor-pointer rounded-2xl border px-3 pb-2 pt-6 text-lg outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                    onChange={(event: any) =>
                      setData(prevState => ({ ...prevState, country_code: event.target.value }))
                    }>
                    {data.country_code ?
                      <option value={data.country_code}>{data.country_code}</option>
                    : <option value="">- Selecciona una opción -</option>}
                    <option value="CO">Colombia</option>
                  </select>
                  <label
                    htmlFor="country_code"
                    className="absolute left-4 right-4 top-4 cursor-pointer text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    País
                  </label>
                </div>
                <div>
                  <div className="group relative w-full">
                    <input
                      type="text"
                      id="city"
                      value={data.city}
                      placeholder=" "
                      className={`peer border transition-all ${
                        errors.city ?
                          "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                        : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                      } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                      onChange={(event: any) => {
                        setData(prevState => ({
                          ...prevState,
                          city: event.target.value
                        }));
                        setErrors(prevState => ({ ...prevState, city: undefined }));
                      }}
                    />
                    <label
                      htmlFor="city"
                      className={`absolute left-4 right-4 top-4 text-lg ${
                        errors.city ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                      } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                      Ciudad
                    </label>
                  </div>
                  {errors.city && <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.city}</p>}
                </div>
                <div>
                  <div className="group relative w-full">
                    <input
                      type="text"
                      id="address"
                      value={data.address}
                      placeholder=" "
                      className={`peer border transition-all ${
                        errors.address ?
                          "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                        : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                      } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                      onChange={(event: any) => {
                        setData(prevState => ({
                          ...prevState,
                          address: event.target.value
                        }));
                        setErrors(prevState => ({ ...prevState, address: undefined }));
                      }}
                    />
                    <label
                      htmlFor="address"
                      className={`absolute left-4 right-4 top-4 text-lg ${
                        errors.address ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                      } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                      Dirección
                    </label>
                  </div>
                  {errors.address && <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.address}</p>}
                </div>
              </div>
              <div>
                <p className="inline-block cursor-help border-b border-dashed border-primary text-sm text-primary">
                  ¿Por qué necesitan esta información?
                </p>
              </div>
              {data.country_code && data.city && data.address ?
                <button type="submit" className="button button-primary" onClick={() => continueHandler()}>
                  Continuar
                </button>
              : <button type="button" className="button-disabled">
                  Continuar
                </button>
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}
