import { Business } from "@typescript/models/business";
import { getConfigs } from "./getConfigs";

export const createBusinessURL = (business: Business): string => {
  if (business.business_custom_domain) {
    return `${getConfigs("application").protocol}://${business.business_custom_domain}`;
  }

  return `${getConfigs("application").protocol}://${business.business_local_subdomain}.${
    getConfigs("application").host
  }`;
};
