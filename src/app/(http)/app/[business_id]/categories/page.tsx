import type { Metadata } from "next";
import Navbar from "../../_components/navbar";
import Header from "./header";
import { CategoriesTable } from "../../_components/tables/categories";
import { Business } from "@typescript/models/business";
import { isBusinessId } from "@guards/business";

export const metadata: Metadata = {
  title: "Categorías"
};

interface Props {
  business: Business;
}

export default isBusinessId(async ({ business }: Props) => {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <main className="space-y-10 px-4 py-10">
        <Navbar business={business} thisPage="categories" />
        <div className="mx-auto max-w-[1280px] space-y-8 rounded-2xl bg-white p-10 shadow-2xl">
          <Header business={business} />
          <CategoriesTable business={business} />
        </div>
      </main>
    </div>
  );
});
