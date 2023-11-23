import { BusinessInterface } from "interfaces";
import { getSettings } from "settings";

export const createBusinessURL = (business: BusinessInterface): string => {
  if (business.business_custom_domain) {
    return `${getSettings("application").protocol}://${business.business_custom_domain}`;
  }

  return `${getSettings("application").protocol}://${business.business_local_subdomain}.${
    getSettings("application").host
  }`;
};
