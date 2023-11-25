"use client";

import { UserController } from "@controllers/user";
import { RecoveryUserPassword } from "@typescript/models/user";
import { GeneralErrors } from "@typescript/others";
import { useState } from "react";

interface Props {
  data: RecoveryUserPassword;
  setStep: any;
  setVerification: any;
  verification: {
    verification_id: string;
    code: string;
  };
}

interface PosibleErrors extends RecoveryUserPassword {
  code: string;
}

export default function SecondStep({ data, setStep, setVerification, verification }: Props) {
  const [errors, setErrors] = useState<GeneralErrors<PosibleErrors>>({});
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const userController = new UserController();

  const continueHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const accessRecovery = await userController.verifyPasswordRecovery(verification.verification_id, verification.code);
    if (!accessRecovery.success) return setErrors(accessRecovery.errors), setWaitingResponse(false);

    setWaitingResponse(false);
    setStep(3);
  };

  return (
    <>
      <h1 className="text-xl font-bold">¿Cuál es el código de seguridad?</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">
          Envíamos un correo con un código de seguridad a {data.email}, ingresalo a continuación para verificar que
          realmente eres tú
        </p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[200px] space-y-6">
            <div className="group relative flex w-full rounded-2xl border border-white-full-dark bg-white-full-dark bg-opacity-20">
              <input
                type="text"
                id="email"
                placeholder={data.email}
                className="w-full cursor-not-allowed rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg text-white-full-dark"
                disabled
              />
              <label
                htmlFor="email"
                className="absolute left-4 right-4 top-2 text-xs text-white-full-dark selection:bg-transparent">
                Correo electrónico
              </label>
            </div>
            <div className="group relative w-full">
              <input
                type="text"
                id="verification-code"
                value={verification.code}
                placeholder=" "
                className={`peer border transition-all ${
                  errors.code ?
                    "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                  : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                onChange={(event: any) => {
                  setVerification(prevState => ({ ...prevState, code: event.target.value }));
                  setErrors(prevState => ({ ...prevState, code: undefined }));
                }}
              />
              <label
                htmlFor="verification-code"
                className={`absolute left-4 right-4 top-4 text-lg ${
                  errors.code ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                Código de verificación
              </label>
            </div>
            {(errors.code || errors.GENERAL_ERROR) && (
              <p className="rounded-2xl bg-[hsla(353,100%,35%,.05)] p-4 font-medium text-[hsla(353,100%,35%,1)]">
                {errors.code || errors.GENERAL_ERROR}
              </p>
            )}
          </div>
          <div>
            <button className="inline-block cursor-pointer border-b border-dashed border-primary text-sm font-medium text-primary">
              No recibí un código de seguridad
            </button>
          </div>
          {!waitingResponse && verification.code && verification.code.length === 6 ?
            <button type="submit" onClick={() => continueHandler()} className="button button-primary">
              Confirmar recuperación
            </button>
          : <button type="button" className="button-disabled">
              Confirmar recuperación
            </button>
          }
        </div>
      </div>
    </>
  );
}
