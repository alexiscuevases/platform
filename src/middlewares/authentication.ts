import { fetchData } from "@helpers/fetchData";
import { getConfigs } from "@helpers/getConfigs";
import { NextRequest } from "next/server";

export const isAuthenticatedMiddleware = async (request: NextRequest): Promise<boolean> => {
  const authenticationCookie = request.cookies.get(getConfigs("application").cookies.authentication.name);
  if (!authenticationCookie) return false;

  const authentication = await fetchData(
    `https://api.abcstudio.agency/authentication/${authenticationCookie.value}`,
    "GET",
    null,
    { next: { revalidate: 3600, tags: ["authentications", `authentication-${authenticationCookie.value}`] } }
  );
  if (!authentication.success) {
    request.cookies.delete(getConfigs("application").cookies.authentication.name);
    return false;
  }

  return true;
};
