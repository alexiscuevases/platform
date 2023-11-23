import { isBusinessId } from "guards";
import type { Metadata } from "next";
import { BusinessApiResponseInterface } from "interfaces";
import Navbar from "../../_components/navbar";
import { ProvidersTable } from "../../_components/tables/providers";
import Header from "./header";

export const metadata: Metadata = {
  title: "Proveedores"
};

interface Props {
  business: BusinessApiResponseInterface;
}

export default isBusinessId(async ({ business }: Props) => {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <main className="space-y-10 px-4 py-10">
        <Navbar business={business} thisPage="providers" />
        <div className="mx-auto max-w-[1280px] space-y-8 rounded-2xl bg-white p-10 shadow-2xl">
          <Header business={business} />
          <ProvidersTable business={business} />
        </div>
      </main>
    </div>
  );
});
