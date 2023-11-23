import { cookies } from "next/headers";
import ClientPage from "./ClientPage";
import type { Metadata } from "next";
import { getSettings } from "settings";
import { getAuthenticationById } from "services";

export const metadata: Metadata = {
  title: "Crear negocio"
};

export default async function Page() {
  const authenticationCookie = cookies().get(getSettings("application").cookies.authentication.name);
  const authentication = await getAuthenticationById(authenticationCookie.value);

  return <ClientPage user={authentication.result.user} />;
}
