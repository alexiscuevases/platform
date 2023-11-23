export * from "./product";

import { BusinessApiResponseInterface } from "interfaces";
import { Products, Products_Skeletoon } from "./components/products";
import { Suspense } from "react";

interface Props {
  data: {
    business: BusinessApiResponseInterface;
  };
}

export function Index_Default({ data }: Props) {
  return (
    <>
      <main className="py-20">
        <div className="mx-auto w-full max-w-[1400px] space-y-14 px-4">
          <div className="mx-auto max-w-[1000px] space-y-4 text-center">
            <div className="text-2xl font-bold leading-tight text-black/95 md:text-3xl">Última colección</div>
            <div className="text-lg text-black/70 md:text-xl">
              A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning
              during extended stretches of running.
            </div>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={<Products_Skeletoon />}>
              <Products business={data.business} />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
