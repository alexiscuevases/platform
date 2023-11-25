import { AuthenticationController } from "@controllers/authentication";
import { getConfigs } from "@helpers/getConfigs";
import { CreateAuthentication } from "@typescript/models/authentication";
import { GeneralErrors } from "@typescript/others";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  data: CreateAuthentication;
  setData: any;
  setStep: any;
  setVerification: any;
  setAuthentication: any;
}

export default function SecondStep({ data, setData, setStep, setVerification, setAuthentication }: Props) {
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<any>>({});
  const router = useRouter();
  const authenticationController = new AuthenticationController();

  const continueHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const create = await authenticationController.create(data);
    if (!create.success) return setErrors(create.errors), setWaitingResponse(false);
    if (!create.result.two_factor_authentication) return router.push(getConfigs("application").URLs.app);

    setVerification({ verification_id: create.result.verification._id });
    setAuthentication(create.result.authentication);

    setWaitingResponse(false);
    setStep(3);
  };
  return (
    <>
      <h1 className="text-xl font-bold">Iniciar sesión en Wealthfront</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">
          Ingresa a continuación la contraseña que utilizas para iniciar sesión en {getConfigs("platform").name}
        </p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[100px] space-y-6">
            <div className="group relative w-full">
              <input
                type="password"
                id="password"
                value={data.password}
                placeholder=" "
                className={`peer border transition-all ${
                  errors.password ?
                    "border-[hsla(353,100%,35%,1)] caret-[hsla(353,100%,35%,1)] hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                  : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                } w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg outline-none`}
                onChange={(event: any) => {
                  setData(prevState => ({ ...prevState, password: event.target.value }));
                  setErrors(prevState => ({ ...prevState, password: null }));
                }}
              />
              <label
                htmlFor="password"
                className={`absolute left-4 right-4 top-4 text-lg ${
                  errors.password ? "text-[hsla(353,100%,35%,1)]" : "text-white-full-dark"
                } cursor-text transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                Contraseña
              </label>
            </div>
            {(errors.password || errors.GENERAL_ERROR) && (
              <p className="rounded-2xl bg-[hsla(353,100%,35%,.05)] p-4 font-medium text-[hsla(353,100%,35%,1)]">
                {errors.password || errors.GENERAL_ERROR}
              </p>
            )}
          </div>
          <div>
            <Link
              href={`${getConfigs("application").URLs.www}/access/recovery`}
              className="inline-block cursor-pointer border-b border-dashed border-primary text-sm font-medium text-primary">
              He olvidado mi contraseña
            </Link>
          </div>
          {!waitingResponse && data.password ?
            <button type="submit" onClick={() => continueHandler()} className="button button-primary">
              Iniciar sesión
            </button>
          : <button type="button" className="button-disabled">
              Iniciar sesión
            </button>
          }
        </div>
      </div>
    </>
  );
}
