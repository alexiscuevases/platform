import { BusinessApiResponseInterface, ParsedProductInterface } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBusinessId } from "services";
import { SchemaParser } from "utilities";

interface Props {
  business: BusinessApiResponseInterface;
}

export async function Products({ business }: Props) {
  const products = await getProductsByBusinessId(business._id);
  const parsedProducts: ParsedProductInterface[] = [];

  products.result?.forEach(product => {
    const productParsed = new SchemaParser({
      language_code: "ES",
      currency_code: "COP"
    }).parseProduct(product);

    parsedProducts.push(productParsed);
  });

  return (
    <>
      {parsedProducts.map((product, index) => (
        <Link
          key={index}
          className="group w-full max-w-[400px] transition-transform duration-300 hover:scale-[1.015] active:scale-[0.985]"
          href={`/products/${product.path}`}>
          <Image
            alt={product.name}
            height={200}
            width={200}
            quality={80}
            className="h-[340px] w-full rounded-lg object-cover sm:h-[355px] lg:h-[370px] xl:h-[385px]"
            src={product.resources[0]}
          />
          <div className="px-2 py-4">
            <h2 className="font-medium group-hover:underline">{product.name}</h2>
            <div className="flex items-center">
              <p className="mr-2 text-black/[0.65]">
                ${new Intl.NumberFormat().format(product.price)} {business.business_currency}
              </p>
              {/* {product.discount_percentage > 0 && (
                <>
                  <p className="text-xs font-light text-black/[0.65] line-through">
                    ${new Intl.NumberFormat().format(product.price)} {business.business_currency}
                  </p>
                  <p className="ml-auto font-semibold text-green-500">100% OFF</p>
                </>
              )} */}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export function Products_Skeletoon() {
  return (
    <>
      {[0, 0, 0, 0].map((item, index) => (
        <div key={index} className="w-full max-w-[400px]">
          <div className="h-[340px] w-full animate-pulse rounded-lg bg-black/[0.05] sm:h-[355px] lg:h-[370px] xl:h-[385px]" />
          <div className="space-y-[6px] px-2 py-4">
            <div className="h-[17px] w-5/6 animate-pulse rounded bg-black/[0.05]"></div>
            <div className="h-[17px] w-4/6 animate-pulse rounded bg-black/[0.05]"></div>
          </div>
        </div>
      ))}
    </>
  );
}
