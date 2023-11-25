import type { Metadata } from "next";
import Navbar from "../../_components/navbar";
import Link from "next/link";
import { IoCashOutline, IoGlobeOutline, IoLanguageOutline, IoLibraryOutline } from "react-icons/io5";
import { Business } from "@typescript/models/business";
import { isBusinessId } from "@guards/business";

export const metadata: Metadata = {
  title: "Configuraciones"
};

interface Props {
  business: Business;
}

export default isBusinessId(async ({ business }: Props) => {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <main className="space-y-10 px-4 py-10">
        <Navbar business={business} thisPage="configuration" />
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-4 gap-10">
          <Link
            href={`/${business._id}/configuration/content`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary hover:shadow-2xl">
            <IoLibraryOutline size={36} />
            <p className="font-medium">Contenido</p>
          </Link>
          <Link
            href={`/${business._id}/configuration`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary hover:shadow-2xl">
            <IoGlobeOutline size={36} />
            <p className="font-medium">Mercados</p>
          </Link>
          <Link
            href={`/${business._id}/configuration`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary">
            <IoLanguageOutline size={36} />
            <p className="font-medium">Traducciones</p>
          </Link>
          <Link
            href={`/${business._id}/configuration`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary">
            <IoCashOutline size={36} />
            <p className="font-medium">Impuestos</p>
          </Link>
        </div>
      </main>
    </div>
  );
});
