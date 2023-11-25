import { ProductComponent } from "./components/product";
import { Suspense } from "react";
import { Products, Products_Skeletoon } from "./components/products";
import { Business } from "@typescript/models/business";
import { Product } from "@typescript/models/business/product";

interface Props {
  data: {
    business: Business;
    product: Product;
    params: {
      product_path: string;
    };
  };
}

export function Product_Default({ data }: Props) {
  return (
    <main className="space-y-24 py-20">
      <ProductComponent business={data.business} product={data.product} params={data.params} />
      <div className="mx-auto w-full max-w-[1400px] space-y-8 px-4">
        <h3 className="text-2xl font-bold leading-tight text-black/95 md:text-3xl">También te puede interesar</h3>
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Suspense fallback={<Products_Skeletoon />}>
            <Products business={data.business} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
