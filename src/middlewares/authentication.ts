import { getSettings } from "settings";
import { NextRequest } from "next/server";
import { fetchData } from "helpers";

export const isAuthenticatedMiddleware = async (request: NextRequest): Promise<boolean> => {
  const authenticationCookie = request.cookies.get(getSettings("application").cookies.authentication.name);
  if (!authenticationCookie) return false;

  const authentication = await fetchData(
    `https://api.abcstudio.agency/authentication/${authenticationCookie.value}`,
    "GET",
    null,
    { next: { revalidate: 3600, tags: ["authentications", `authentication-${authenticationCookie.value}`] } }
  );
  if (!authentication.success) {
    request.cookies.delete(getSettings("application").cookies.authentication.name);
    return false;
  }

  return true;
};
