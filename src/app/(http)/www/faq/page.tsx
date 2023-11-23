import { GeneralFAQs } from "../_components/FAQs";
import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes"
};

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-ambient-peach to-ambient-lavender bg-fixed">
      <Header />
      <main className="mx-auto space-y-20 py-20">
        <div className="3xl:px-0 w-full max-w-[1896px] px-6 pb-4 text-primary-dark md:px-14 md:py-10 xl:px-20">
          <div className="flex flex-col gap-x-10 gap-y-2 lg:flex-row lg:items-center">
            <h3 className="text-2xl font-semibold">Preguntas frecuentes, respondidas</h3>
          </div>
          <div className="mt-4">
            <GeneralFAQs />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
