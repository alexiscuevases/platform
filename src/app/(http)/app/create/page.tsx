import { cookies } from "next/headers";
import ClientPage from "./ClientPage";
import type { Metadata } from "next";
import { getAuthenticationById } from "@services/authentication";
import { getConfigs } from "@helpers/getConfigs";

export const metadata: Metadata = {
  title: "Crear negocio"
};

export default async function Page() {
  const authenticationCookie = cookies().get(getConfigs("application").cookies.authentication.name);
  const authentication = await getAuthenticationById(authenticationCookie.value);

  return <ClientPage user={authentication.result.user} />;
}
