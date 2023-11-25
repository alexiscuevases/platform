import { isBusinessHost } from "@guards/business";
import { isProductPath } from "@guards/product";
import { getConfigs } from "@helpers/getConfigs";
import { getProductsByBusinessId } from "@services/business/product";
import { UseTemplate } from "@templates/index";
import { Business } from "@typescript/models/business";
import { Product } from "@typescript/models/business/product";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: any, parent: any): Promise<Metadata> {
  const products = await getProductsByBusinessId((await parent).other.business_id as string, {
    path: params.product_path
  });

  if (!products.result || !products.result[0])
    return {
      title: "Not found"
    };

  const cookieStore = cookies();
  const languageCookie = cookieStore.get(getConfigs("application").cookies.language.name);

  return {
    title: products.result[0].names[languageCookie ? languageCookie.value : "Default"]
  };
}

interface Props {
  business: Business;
  product: Product;
  params: {
    product_path: string;
  };
}

export default isBusinessHost(
  isProductPath(({ business, product, params }: Props) => (
    <UseTemplate template="Default" page="Product" data={{ business, product, params }} />
  ))
);
