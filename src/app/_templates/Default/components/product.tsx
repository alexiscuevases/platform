import { BusinessApiResponseInterface, ProductApiResponseInterface } from "interfaces";
import { SchemaParser } from "utilities";

interface Props {
  business: BusinessApiResponseInterface;
  product: ProductApiResponseInterface;
  params: {
    product_path: string;
  };
}

export async function Product({ business, product, params }: Props) {
  const parsedProduct = new SchemaParser({
    language_code: "ES",
    currency_code: "COP"
  }).parseProduct(product);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="flex flex-col gap-[50px] lg:flex-row lg:gap-[100px]">
        <div className="mx-auto w-full max-w-[500px] flex-[1.5] md:w-auto lg:mx-0 lg:max-w-full">
          <div className="sticky top-[50px] mx-auto w-full max-w-[1360px] text-[20px] text-white"></div>
        </div>
        <div className="flex-[1] space-y-14">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-3xl font-semibold leading-tight text-black/95">{parsedProduct.name}</div>
              <div className="text-black/70">Men&apos;s Shoes</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="mr-2 text-2xl">
                  ${new Intl.NumberFormat().format(parsedProduct.price)} {business.business_currency}
                </p>
                {/* {product.discount_percentage > 0 && (
                  <>
                    <p className="text-black/[0.60] line-through">
                      ${new Intl.NumberFormat().format(product.price)} {business.business_currency}
                    </p>
                    <p className="ml-auto font-medium text-green-500">{product.discount_percentage}% de Desc.</p>
                  </>
                )} */}
              </div>
              <div>
                <div className="text-sm font-light text-black/[0.5]">Impuestos incluidos</div>
                <div className="text-sm font-light text-black/[0.5]">
                  (También incluye todos los aranceles aplicables)
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-md font-semibold">Seleccionar talla</div>
                <div className="text-md cursor-pointer font-medium text-black/[0.5]">Guía de tallas</div>
              </div>
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                <div className="cursor-pointer rounded-full border py-3 text-center font-medium hover:border-black">
                  UK 6
                </div>
                <div className="cursor-pointer rounded-full border py-3 text-center font-medium hover:border-black">
                  UK 6
                </div>
                <div className="cursor-not-allowed rounded-full border bg-black/[0.1] py-3 text-center font-medium opacity-50">
                  UK 11.5
                </div>
                <div className="cursor-pointer rounded-full border py-3 text-center font-medium hover:border-black">
                  UK 6
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full rounded-full bg-black py-4 text-lg font-medium text-white transition-transform hover:opacity-75 active:scale-95">
                Agregar al carrito
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-black py-4 text-lg font-medium transition-transform hover:opacity-75 active:scale-95">
                Agregrar a favoritos
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M349.6 64c-36.4 0-70.7 16.7-93.6 43.9C233.1 80.7 198.8 64 162.4 64 97.9 64 48 114.2 48 179.1c0 79.5 70.7 143.3 177.8 241.7L256 448l30.2-27.2C393.3 322.4 464 258.6 464 179.1 464 114.2 414.1 64 349.6 64zm-80.8 329.3l-4.2 3.9-8.6 7.8-8.6-7.8-4.2-3.9c-50.4-46.3-94-86.3-122.7-122-28-34.7-40.4-63.1-40.4-92.2 0-22.9 8.4-43.9 23.7-59.3 15.2-15.4 36-23.8 58.6-23.8 26.1 0 52 12.2 69.1 32.5l24.5 29.1 24.5-29.1c17.1-20.4 43-32.5 69.1-32.5 22.6 0 43.4 8.4 58.7 23.8 15.3 15.4 23.7 36.5 23.7 59.3 0 29-12.5 57.5-40.4 92.2-28.8 35.7-72.3 75.7-122.8 122z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xl font-bold">Detalles del producto</div>
            <div className="text-md space-y-4 text-black/[0.70]">
              <p>{parsedProduct.description}</p>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold text-black">Colour Shown:</span> Sesame/Chambray
                </li>
                <li>
                  <span className="font-semibold text-black">Colour Shown:</span> Sesame/Chambray
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function Product_Skeletoon() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4">
      <div className="flex flex-col gap-[50px] lg:flex-row lg:gap-[100px]">
        <div className="mx-auto w-full max-w-[500px] flex-[1.5] md:w-auto lg:mx-0 lg:max-w-full">
          <div className="sticky top-[50px] mx-auto w-full max-w-[1360px] text-[20px] text-white"></div>
        </div>
        <div className="flex-[1] space-y-14">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="h-9 w-full animate-pulse rounded bg-black/[0.05]"></div>
              <div className="h-6 w-2/6 animate-pulse rounded bg-black/[0.05]"></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-8 w-3/6 animate-pulse rounded bg-black/[0.05]"></div>
              </div>
              <div className="space-y-1">
                <div className="h-4 w-2/6 animate-pulse rounded bg-black/[0.05]"></div>
                <div className="h-4 w-4/6 animate-pulse rounded bg-black/[0.05]"></div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-5 w-3/12 animate-pulse rounded bg-black/[0.05]"></div>
                <div className="h-5 w-3/12 animate-pulse rounded bg-black/[0.05]"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-14 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
                <div className="h-14 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
                <div className="h-14 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
                <div className="h-14 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
                <div className="h-14 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
                <div className="h-14 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
              <div className="h-16 w-full animate-pulse rounded-full bg-black/[0.05]"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-8 w-2/6 animate-pulse rounded bg-black/[0.05]"></div>
            <div className="h-36 w-full animate-pulse rounded bg-black/[0.05]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
