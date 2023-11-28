import type { Metadata } from "next";
import Navbar from "../../../_components/navbar";
import Link from "next/link";
import {
  IoAlbumsOutline,
  IoConstructOutline,
  IoGiftOutline,
  IoLayersOutline,
  IoPeopleCircleOutline,
  IoPricetagsOutline,
  IoTicketOutline
} from "react-icons/io5";
import { isBusinessId } from "@guards/business";
import { Business } from "@typescript/models/business";

export const metadata: Metadata = {
  title: "Contenido"
};

interface Props {
  business: Business;
}

export default isBusinessId(async ({ business }: Props) => {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <main className="space-y-10 px-4 py-10">
        <Navbar business={business} thisPage="content" />
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-4 gap-10">
          <Link
            href={`/${business._id}/collections`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary hover:shadow-2xl">
            <IoAlbumsOutline size={36} />
            <p className="font-medium">Colecciones</p>
          </Link>
          <Link
            href={`/${business._id}/categories`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary hover:shadow-2xl">
            <IoLayersOutline size={36} />
            <p className="font-medium">Categorías</p>
          </Link>
          <Link
            href={`/${business._id}/providers`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary">
            <IoPeopleCircleOutline size={36} />
            <p className="font-medium">Proveedores</p>
          </Link>
          <Link
            href={`/${business._id}/tags`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary">
            <IoPricetagsOutline size={36} />
            <p className="font-medium">Etiquetas</p>
          </Link>
          <Link
            href={`/${business._id}/gift_cards`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary">
            <IoGiftOutline size={36} />
            <p className="font-medium">Tarjetas de regalo</p>
          </Link>
          <Link
            href={`/${business._id}/coupons`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary">
            <IoTicketOutline size={36} />
            <p className="font-medium">Cupones</p>
          </Link>
          <Link
            href={`/${business._id}/template`}
            className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white text-primary-dark shadow-xl duration-300 hover:scale-105 hover:text-primary">
            <IoConstructOutline size={36} />
            <p className="font-medium">Plantilla</p>
          </Link>
        </div>
      </main>
    </div>
  );
});
