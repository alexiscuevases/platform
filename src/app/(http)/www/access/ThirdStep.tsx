import { AuthenticationController } from "@controllers/authentication";
import { getConfigs } from "@helpers/getConfigs";
import { Authentication, CreateAuthentication } from "@typescript/models/authentication";
import { GeneralErrors } from "@typescript/others";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  data: CreateAuthentication;
  verification: {
    verification_id: string;
    code: string;
  };
  setVerification: any;
  authentication: Authentication;
}

export default function ThirdStep({ data, verification, setVerification, authentication }: Props) {
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<any>>({});
  const router = useRouter();
  const authenticationController = new AuthenticationController();

  const continueHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const verifyAuthenticationCreation = await authenticationController.verifyCreation(
      verification.verification_id,
      verification.code,
      authentication._id
    );

    if (!verifyAuthenticationCreation.success)
      return setErrors(verifyAuthenticationCreation.errors), setWaitingResponse(false);
    return router.push(getConfigs("application").URLs.app);
  };
  return (
    <>
      <h1 className="text-xl font-bold">Verificación de identidad (2FA)</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">
          Envíamos un correo con un código de seguridad a {data.email}, igresalo a continuación para verificar que
          realmente eres tú
        </p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[100px] space-y-6">
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
              Verificar Inicio de sesíon
            </button>
          : <button type="button" className="button-disabled">
              Verificar Inicio de sesíon
            </button>
          }
        </div>
      </div>
    </>
  );
}
