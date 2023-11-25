import { getProductsByBusinessId } from "@services/business/product";
import { notFound } from "next/navigation";

export const isProductPath = (handler: any) => {
  return async (context: any) => {
    const path = context.params.product_path;

    const products = await getProductsByBusinessId(context.business._id, { path });
    if (products.success && products.result[0]) context.product = products.result[0];
    else return notFound();

    return handler(context);
  };
};
