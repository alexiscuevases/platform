import { getSettings } from "settings";

export const getLocalSubdomainOrDomain = (headers: Headers): string => {
  const host = headers.get("host");
  return host.replace(`.${getSettings("application").host}`, "");
};
