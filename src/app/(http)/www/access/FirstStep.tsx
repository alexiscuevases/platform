import { getConfigs } from "@helpers/getConfigs";
import { CreateAuthentication } from "@typescript/models/authentication";
import Link from "next/link";

interface Props {
  searchParams: { success: "created" | "updated" };
  data: CreateAuthentication;
  setData: any;
  setStep: any;
}

export default function FirstStep({ searchParams, data, setData, setStep }: Props) {
  return (
    <>
      <h1 className="text-xl font-bold">Iniciar sesión en {getConfigs("platform").name}</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">
          Ingresa a continuación tu correo electrónico registrado en {getConfigs("platform").name}
        </p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[100px] space-y-6">
            <div className="group relative w-full">
              <input
                type="text"
                id="email"
                value={data.email}
                placeholder=" "
                className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                onChange={(event: any) => setData(prevState => ({ ...prevState, email: event.target.value }))}
              />
              <label
                htmlFor="email"
                className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Correo electrónico
              </label>
            </div>
            {searchParams.success && (
              <p className="rounded-2xl bg-green-50 p-4 font-medium text-green-700">
                ¡{searchParams.success === "created" ? "Cuenta creada" : "Contraseña actualizada"}! Ahora puedes iniciar
                sesión
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <span className="inline-block cursor-help border-b border-dashed border-primary text-sm font-medium text-primary">
                He olvidado mi correo electrónico
              </span>
            </div>
            <div>
              <Link
                href={`${getConfigs("application").URLs.www}/get-started`}
                className="inline-block cursor-pointer border-b border-dashed border-primary text-sm font-medium text-primary">
                No tengo una cuenta
              </Link>
            </div>
          </div>
          {data && data.email ?
            <button type="submit" onClick={() => setStep(2)} className="button button-primary">
              Continuar
            </button>
          : <button type="button" className="button-disabled">
              Continuar
            </button>
          }
        </div>
      </div>
    </>
  );
}
