import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { cookies } from "next/headers";
import { getConfigs } from "@helpers/getConfigs";
import { getAuthenticationById } from "@services/authentication";

export const metadata: Metadata = {
  title: "Mis negocios"
};

export default async function Page() {
  const authenticationCookie = cookies().get(getConfigs("application").cookies.authentication.name);
  const authentication = await getAuthenticationById(authenticationCookie.value);

  return <ClientPage user={authentication.result.user} />;
}
