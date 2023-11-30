"use client";

import { UserController } from "@controllers/models/user";
import { getConfigs } from "@helpers/getConfigs";
import { ChangeUserPassword, User } from "@typescript/models/user";
import { GeneralErrors } from "@typescript/others";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  user: User;
  data: ChangeUserPassword;
  setData: any;
}

export default function ThirdStep({ user, data, setData }: Props) {
  const [errors, setErrors] = useState<GeneralErrors<ChangeUserPassword>>({});
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const router = useRouter();
  const userController = new UserController();

  const continueHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const changePassword = await userController.changePassword(user._id, data);
    if (!changePassword.success) return setErrors(changePassword.errors), setWaitingResponse(false);

    router.push("/access?success=updated");
  };

  return (
    <>
      <h1 className="text-xl font-bold">Crea una nueva contraseña</h1>
      <div className="space-y-6">
        <p className="text-white-full-dark">
          Crea una nueva contraseña para tu cuenta de {getConfigs("platform").name}
        </p>
        <div className="max-w-[500px] space-y-8">
          <div className="min-h-[200px] space-y-6">
            <div>
              <div className="group relative flex w-full rounded-2xl border">
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  placeholder=" "
                  className="peer w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  onChange={(event: any) => setData(prevState => ({ ...prevState, password: event.target.value }))}
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  Nueva contraseña
                </label>
              </div>
              <p className="mt-3 text-xs text-white-full-dark">
                Hazla única y con al menos 8 caracteres.{" "}
                <span className="cursor-help border-b border-dashed border-white-full-dark">¿Necesitas consejos?</span>
              </p>
            </div>
            <div>
              <div className="group relative flex w-full rounded-2xl border">
                <input
                  type="password"
                  id="password-confirmation"
                  value={data.password_confirmation}
                  placeholder=" "
                  className="peer w-full rounded-2xl bg-transparent px-4 pb-2 pt-6 text-lg caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  onChange={(event: any) =>
                    setData(prevState => ({
                      ...prevState,
                      password_confirmation: event.target.value
                    }))
                  }
                />
                <label
                  htmlFor="password-confirmation"
                  className="absolute left-4 right-4 top-4 cursor-text text-lg text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  Confirmar contraseña
                </label>
              </div>
              <p className="mt-3 text-xs text-white-full-dark">Hazla identica a la contraseña anterior</p>
            </div>
            {(errors.password || errors.password_confirmation || errors.GENERAL_ERROR) && (
              <p className="rounded-2xl bg-[hsla(353,100%,35%,.05)] p-4 font-medium text-[hsla(353,100%,35%,1)]">
                {errors.password || errors.password_confirmation || errors.GENERAL_ERROR}
              </p>
            )}
          </div>
          {!waitingResponse && data.password && data.password_confirmation ?
            <button type="submit" onClick={() => continueHandler()} className="button button-primary">
              Asignar nueva contraseña
            </button>
          : <button type="button" className="button-disabled">
              Asignar nueva contraseña
            </button>
          }
        </div>
      </div>
    </>
  );
}
