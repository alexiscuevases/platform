import type { Metadata } from "next";
import Navbar from "../../_components/navbar";
import { ProductsTable } from "../../_components/tables/products";
import Header from "./header";
import { isBusinessId } from "@guards/business";
import { Business } from "@typescript/models/business";

export const metadata: Metadata = {
  title: "Productos"
};

interface Props {
  business: Business;
}

export default isBusinessId(async ({ business }: Props) => {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <main className="space-y-10 px-4 py-10">
        <Navbar business={business} thisPage="products" />
        <div className="mx-auto max-w-[1280px] space-y-8 rounded-2xl bg-white p-10 shadow-2xl">
          <Header business={business} />
          <ProductsTable business={business} />
        </div>
      </main>
    </div>
  );
});
