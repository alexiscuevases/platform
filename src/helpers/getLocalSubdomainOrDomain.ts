import { getConfigs } from "./getConfigs";

export const getLocalSubdomainOrDomain = (headers: Headers): string => {
  const host = headers.get("host");
  return host.replace(`.${getConfigs("application").host}`, "");
};
