import { BusinessApiResponseInterface, ProductApiResponseInterface } from "interfaces";
import { isBusinessHost, isProductPath } from "guards";
import { Metadata } from "next";
import { UseTemplate } from "app/_templates";
import { getProductsByBusinessId } from "services";
import { cookies } from "next/headers";
import { getSettings } from "settings";

export async function generateMetadata({ params }: any, parent: any): Promise<Metadata> {
  const products = await getProductsByBusinessId((await parent).other.business_id as string, {
    path: params.product_path
  });

  if (!products.result || !products.result[0])
    return {
      title: "Not found"
    };

  const cookieStore = cookies();
  const languageCookie = cookieStore.get(getSettings("application").cookies.language.name);

  return {
    title: products.result[0].names[languageCookie ? languageCookie.value : "Default"]
  };
}

interface Props {
  business: BusinessApiResponseInterface;
  product: ProductApiResponseInterface;
  params: {
    product_path: string;
  };
}

export default isBusinessHost(
  isProductPath(({ business, product, params }: Props) => (
    <UseTemplate template="Default" page="Product" data={{ business, product, params }} />
  ))
);
