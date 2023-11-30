"use client";

import { UserController } from "@controllers/models/user";
import { getConfigs } from "@helpers/getConfigs";
import { CreateUser } from "@typescript/models/user";
import { GeneralErrors } from "@typescript/others";
import { useState } from "react";

interface Props {
  setData: any;
  data: CreateUser;
  setStep: any;
  step: number;
  setVerification: any;
}

export default function SecondStep({ setData, data, setStep, setVerification }: Props) {
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<CreateUser>>({});
  const userController = new UserController();

  const continueHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const verifyCreation = await userController.verifyCreation(data.email);
    if (!verifyCreation.success) return setErrors(verifyCreation.errors), setWaitingResponse(false);

    setVerification({ verificationCode: verifyCreation.result.verificationCode });
    setStep(3);
    setWaitingResponse(false);
  };

  return (
    <div className="mx-auto max-w-[950px] rounded-2xl bg-white px-10 py-10 shadow-2xl">
      <h1 className="text-xl font-bold">Correo electrónico</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">
          Por este medio le comunicaremos cualquier información importante y, lo usarás para iniciar sesión en{" "}
          {getConfigs("platform").name}
        </p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[200px] space-y-6">
            <div className="group relative w-full">
              <input
                type="text"
                id="email"
                value={data.email}
                placeholder=" "
                className={`peer border transition-all ${
                  errors.email ?
                    "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                  : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                onChange={(event: any) => {
                  setData(prevState => ({ ...prevState, email: event.target.value }));
                  setErrors(prevState => ({ ...prevState, email: undefined }));
                }}
              />
              <label
                htmlFor="email"
                className={`absolute left-4 right-4 top-4 text-lg ${
                  errors.email ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                Correo electrónico
              </label>
            </div>
            {(errors.email || errors.GENERAL_ERROR) && (
              <p className="rounded-2xl bg-[hsla(353,100%,35%,.05)] p-4 font-medium text-[hsla(353,100%,35%,1)]">
                {errors.email || errors.GENERAL_ERROR}
              </p>
            )}
          </div>
          <div>
            <p className="inline-block cursor-help border-b border-dashed border-primary text-sm text-primary">
              ¿Por qué necesitan mi correo electrónico?
            </p>
          </div>
          {!waitingResponse && data.email ?
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
