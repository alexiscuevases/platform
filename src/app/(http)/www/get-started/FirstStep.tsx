"use client";

import { CreateUserInterface, ErrorsInterface } from "interfaces";
import { SchemaValidator } from "utilities";
import Link from "next/link";
import { useState } from "react";
import { getSettings } from "settings";

interface Props {
  setData: any;
  data: CreateUserInterface;
  setStep: any;
}

export default function FirstStep({ setData, data, setStep }: Props) {
  const [errors, setErrors] = useState<ErrorsInterface<CreateUserInterface>>({});

  const continueHandler = () => {
    const validation = new SchemaValidator({
      names: { isRequired: true, maxLength: 32 },
      surnames: { isRequired: true, maxLength: 32 }
    }).validate({ names: data.names, surnames: data.surnames });
    if (!validation.success) return setErrors(validation.errors);

    setStep(2);
  };

  return (
    <div className="mx-auto max-w-[950px] rounded-2xl bg-white px-10 py-10 shadow-2xl">
      <h1 className="text-xl font-bold">Información personal</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">Antes de continuar, ¿Nos podrías contar un poco sobre tí?</p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[200px] space-y-4">
            <div>
              <div className="group relative w-full">
                <input
                  type="text"
                  id="names"
                  value={data.names}
                  placeholder=" "
                  className={`peer border transition-all ${
                    errors.names ?
                      "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                    : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                  onChange={(event: any) => {
                    setData(prevState => ({ ...prevState, names: event.target.value }));
                    setErrors(prevState => ({ ...prevState, names: undefined }));
                  }}
                />
                <label
                  htmlFor="names"
                  className={`absolute left-4 right-4 top-4 text-lg ${
                    errors.names ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                  } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                  Nombres
                </label>
              </div>
              {errors.names && <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.names}</p>}
            </div>
            <div>
              <div className="group relative w-full">
                <input
                  type="text"
                  id="surnames"
                  value={data.surnames}
                  placeholder=" "
                  className={`peer border transition-all ${
                    errors.surnames ?
                      "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                    : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                  onChange={(event: any) => {
                    setData(prevState => ({ ...prevState, surnames: event.target.value }));
                    setErrors(prevState => ({ ...prevState, surnames: undefined }));
                  }}
                />
                <label
                  htmlFor="surnames"
                  className={`absolute left-4 right-4 top-4 text-lg ${
                    errors.surnames ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                  } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                  Apellidos
                </label>
              </div>
              {errors.surnames && <p className="mt-2 text-xs text-[hsla(353,100%,35%,1)]">{errors.surnames}</p>}
            </div>
          </div>
          <div>
            <Link
              href={`${getSettings("application").URLs.www}/access`}
              className="inline-block cursor-pointer border-b border-dashed border-primary text-sm font-medium text-primary">
              Ya tengo una cuenta
            </Link>
          </div>
          {data.names && data.surnames ?
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
