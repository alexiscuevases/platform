import ClientPage from "./ClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceder"
};

export default function Page({ searchParams }) {
  return <ClientPage searchParams={searchParams} />;
}
