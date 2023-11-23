import type { Metadata } from "next";
import Navbar from "../../_components/navbar";
import { BusinessApiResponseInterface } from "interfaces";
import { isBusinessId } from "guards";

export const metadata: Metadata = {
  title: "Vista general"
};

interface Props {
  business: BusinessApiResponseInterface;
}

export default isBusinessId(({ business }: Props) => {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <main className="space-y-10 px-4 py-10">
        <Navbar thisPage="overview" business={business} />
        <div className="mx-auto max-w-[1280px] space-y-2 rounded-2xl bg-white p-10 shadow-2xl">
          <div className="min-h-[48px]">
            <h1 className="text-xl font-bold">Vista general de {business.business_name}</h1>
          </div>
          <></>
        </div>
      </main>
    </div>
  );
});
