import Image from "next/image";
import Link from "next/link";

export function Section() {
  return (
    <div className="3xl:px-0 m-auto flex max-w-[1896px] flex-col items-start justify-center px-2 py-20 text-primary-dark sm:px-12 md:items-center lg:flex-row lg:pb-28 xl:px-14">
      <div className="relative w-full lg:w-1/2">
        <Image
          className="h-[358px] w-full overflow-hidden rounded-2xl object-cover sm:h-[468px] lg:h-[522px]"
          width={969}
          height={710}
          alt=""
          src="/images/landscape.webp"
        />
      </div>
      <div className="relative flex justify-center px-2 pt-20 md:pt-24 lg:w-1/2 lg:py-0 lg:pl-12 xl:text-center">
        <div className="max-w-[750px] space-y-6 lg:max-w-[682px]">
          <div className="space-y-4">
            <h2>
              <span className="font-GT_Alpina text-7xl font-extralight">Una plataforma de Comercio Digital.</span>
              <br />
              <span className="text-7xl font-bold">Para ayudarte a crecer.</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-bold">Conozcamos el producto...</p>
              <p>
                Construye las experiencias de comercio digital B2C y B2B de alto rendimiento que tus clientes esperan
                con la agilidad que tu negocio necesita.
              </p>
            </div>
            <div className="m-auto grid max-w-full grid-cols-1 gap-2 pt-2 text-left md:grid-cols-2 lg:max-w-[580px]">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                    className="inline-block h-[1.2em] align-[-0.25em]">
                    <path d="M18.53 7.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l2.763 2.762a1 1 0 001.414 0L17.47 7.47a.75.75 0 011.061 0h-.001z" />
                  </svg>
                </div>
                <div className="font-bold">Gestión de pedidos</div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                    className="inline-block h-[1.2em] align-[-0.25em]">
                    <path d="M18.53 7.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l2.763 2.762a1 1 0 001.414 0L17.47 7.47a.75.75 0 011.061 0h-.001z" />
                  </svg>
                </div>
                <div className="font-bold">Gestión de productos</div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                    className="inline-block h-[1.2em] align-[-0.25em]">
                    <path d="M18.53 7.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l2.763 2.762a1 1 0 001.414 0L17.47 7.47a.75.75 0 011.061 0h-.001z" />
                  </svg>
                </div>
                <div className="font-bold">Marketplace</div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                    className="inline-block h-[1.2em] align-[-0.25em]">
                    <path d="M18.53 7.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l2.763 2.762a1 1 0 001.414 0L17.47 7.47a.75.75 0 011.061 0h-.001z" />
                  </svg>
                </div>
                <div className="font-bold">Informes y análisis</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row md:items-center xl:justify-center">
            <div className="items-start space-x-8 space-y-4 md:space-x-0 lg:flex lg:flex-col xl:items-center">
              <Link
                className="button_primaryButton__ipohF relative z-10 inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-md bg-primary px-5 py-3 font-medium text-white transition-all 2xl:px-6 2xl:py-3.5"
                href="/start/account-type?intent=cash">
                Empezar gratis
              </Link>
              <Link className="relative z-10 hidden font-medium text-primary-dark underline md:block" href="/cash">
                Conozca más sobre este producto
              </Link>
              <Link className="relative z-10 font-medium text-primary-dark underline md:hidden" href="/cash">
                Conocer más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
