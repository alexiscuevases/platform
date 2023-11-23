import { notFound } from "next/navigation";
import { getBusinesses } from "services";

export const isBusinessHost = (handler: any) => {
  return async (context: any) => {
    const host = context.params.host;

    const businesses = await getBusinesses(
      host.includes(".") ? { business_custom_domain: host } : { business_local_subdomain: host }
    );
    if (businesses.success && businesses.result[0]) context.business = businesses.result[0];
    else return notFound();

    return handler(context);
  };
};

export const isBusinessId = (handler: any) => {
  return async (context: any) => {
    const _id = context.params.business_id;

    const businesses = await getBusinesses({ _id });
    if (businesses.success && businesses.result[0]) context.business = businesses.result[0];
    else return notFound();

    return handler(context);
  };
};
