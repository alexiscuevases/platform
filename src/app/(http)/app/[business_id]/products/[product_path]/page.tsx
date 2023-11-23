import { isBusinessId, isProductPath } from "guards";
import type { Metadata } from "next";
import { BusinessApiResponseInterface, ProductApiResponseInterface } from "interfaces";
import Navbar from "../../../_components/navbar";
import Header from "./header";
import { cleanObject } from "helpers";

export const metadata: Metadata = {
  title: "Productos"
};

interface Props {
  business: BusinessApiResponseInterface;
  product: ProductApiResponseInterface;
}

export default isBusinessId(
  isProductPath(({ business, product }: Props) => {
    return (
      <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
        <main className="space-y-10 px-4 py-10">
          <Navbar business={business} thisPage="products" />
          <div className="mx-auto max-w-[1280px] space-y-8 rounded-2xl bg-white p-10 shadow-2xl">
            <Header business={business} product={cleanObject(product)} />
          </div>
        </main>
      </div>
    );
  })
);
