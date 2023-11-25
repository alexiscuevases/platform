import { getConfigs } from "@helpers/getConfigs";
import Link from "next/link";

export function Footer() {
  const FooterData = [
    {
      name: "Productos",
      links: [
        {
          name: "Plataforma de Comercio Digital",
          link: `${getConfigs("application").URLs.www}/digital-commerce`
        }
      ]
    },
    {
      name: "Legal",
      links: [
        {
          name: "Términos y Condiciones de Uso",
          link: `${getConfigs("application").URLs.www}/legal/terms-and-conditions`
        },
        {
          name: "Política de Privacidad",
          link: `${getConfigs("application").URLs.www}/legal/privacy-policy`
        },
        {
          name: "Política de Cookies",
          link: `${getConfigs("application").URLs.www}/legal/cookies-policy`
        },
        {
          name: "Política de Cancelación y Devolución",
          link: `${getConfigs("application").URLs.www}/legal/cancellation-and-refund-policy`
        }
      ]
    },
    {
      name: "Recursos",
      links: [
        {
          name: "Blog",
          link: getConfigs("application").URLs.blog
        },
        {
          name: "Preguntas frecuentes",
          link: `${getConfigs("application").URLs.www}/faq`
        },
        {
          name: "Centro de Ayuda",
          link: `${getConfigs("application").URLs.www}/help-center`
        }
      ]
    },
    {
      name: "Empresa",
      links: [
        {
          name: "Sobre nosotros",
          link: `${getConfigs("application").URLs.www}/about-us`
        },
        {
          name: "Trabaja con nosotros",
          link: `${getConfigs("application").URLs.www}/work-with-us`
        },
        {
          name: "Contacta con nosotros",
          link: `${getConfigs("application").URLs.www}/contact-us`
        },
        {
          name: "Aviso legal",
          link: `${getConfigs("application").URLs.www}/legal`
        }
      ]
    }
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-primary-full-dark">
        <div className="mx-auto max-w-[2024px] divide-y divide-white px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-x-6 pb-8 pt-8 md:flex-row md:pt-16">
            <Link href={getConfigs("application").URLs.www}>
              <svg width="200" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.34 2.024c.127.004.242.012.343.025.262.033.223.268.163.619-1.463 8.727-2.11 18.128 3.047 22.623.054.05.129.155.104.194-.025.038-.177.018-.24.014C21.22 25.34 10.98 21.27 11.415 3.802c.007-.28.045-.408.46-.53 1.385-.403 5.766-1.188 7.98-1.248h.486ZM3.977 10.82c.242-.17 2.981-1.52 5.5-2.42.504-.161.501.36.525.498 2.353 13.408 8.105 15.095 9.723 16.421.217.145-.061.198-.337.185-11.63.037-15.131-10.658-15.775-14.165-.06-.323.122-.348.364-.519Zm-3.72 8.506c.595-.73 2.33-2.193 3.052-2.672.219-.145.377.19.57.646.78 1.673 1.943 3.432 3.085 4.59 2.284 2.314 4.781 3.198 4.909 3.3.194.16.193.286-.18.3C3.79 25.784.56 22.046.021 19.88c-.058-.235-.007-.26.234-.554Z"
                  fill="#fff"
                />
                <path
                  d="m42.526 1.739-3.47 13.949-3.142-13.95h-5.99l5.88 23.725h5.37l3.508-13.91 3.47 13.91h5.37L59.439 1.74h-5.917l-3.105 13.949-3.434-13.95h-4.457ZM68.013 19.397c-.329 1.198-1.242 1.739-2.41 1.739-1.645 0-2.667-1.12-2.85-3.207h10.63v-1.507c0-5.178-2.85-8.733-7.89-8.733-4.75 0-8.256 3.71-8.256 9.08 0 5.41 3.324 9.08 8.365 9.08 4.274 0 7.123-2.433 7.708-6.452h-5.297Zm-2.52-6.994c1.424 0 2.264 1.082 2.338 2.512h-4.969c.366-1.623 1.279-2.512 2.63-2.512ZM89.645 25.463V14.8c0-4.52-2.666-7.148-7.342-7.148-4.238 0-7.05 2.666-7.525 6.027h5.406c.256-.772.877-1.275 1.936-1.275 1.388 0 2.01.966 2.01 2.087v1.12c-.658-.502-2.265-.966-3.617-.966-3.58 0-6.32 2.164-6.32 5.526 0 3.67 2.74 5.602 5.991 5.602 1.754 0 3.397-.618 3.945-1.197v.888h5.516Zm-5.516-4.868c-.365.695-1.351 1.159-2.41 1.159-1.133 0-2.265-.502-2.265-1.7 0-1.16 1.132-1.662 2.264-1.662 1.06 0 2.046.464 2.411 1.198v1.005ZM96.99.348h-5.734v25.115h5.735V.348ZM100.64 19.474c0 4.405 2.192 6.337 6.064 6.337 1.278 0 2.52-.232 3.178-.54v-5.14a4.706 4.706 0 0 1-1.827.387c-1.132 0-1.753-.58-1.753-1.932V12.79h3.434V8.076h-3.434V3.284h-5.662v4.792h-2.411v4.714h2.411v6.684ZM111.036 25.463h5.735v-10.51c.292-1.197 1.242-1.893 2.374-1.893 1.461 0 2.155 1.043 2.155 2.473v9.93h5.699V14.065c0-3.864-2.155-6.376-5.808-6.376-1.9 0-3.507.812-4.42 1.894V.348h-5.735v25.115ZM139.422.464c-.694-.27-1.571-.464-2.666-.464-4.019 0-6.393 2.627-6.393 6.8v1.276h-2.447v4.714h2.447v12.673h5.662V12.79h3.178V8.076h-3.178v-.928c0-1.39.767-2.086 2.046-2.086.511 0 .949.116 1.351.348V.464ZM151.356 7.998c-.255-.154-.84-.309-1.57-.309-1.644 0-2.923.773-3.726 1.932V8.076h-5.735v17.387h5.735v-10.2c.292-1.237 1.351-1.971 2.922-1.971.913 0 1.68.155 2.374.54V7.999ZM169.017 16.77c0-5.371-3.703-9.08-8.708-9.08-4.968 0-8.401 3.709-8.401 9.08 0 5.37 3.739 9.08 8.707 9.08 5.004 0 8.402-3.71 8.402-9.08Zm-5.931 0c0 2.395-.987 4.057-2.777 4.057-1.753 0-2.739-1.662-2.739-4.058 0-2.395.986-4.095 2.739-4.095 1.79 0 2.777 1.7 2.777 4.096ZM170.254 25.463h5.735v-10.51c.293-1.197 1.242-1.893 2.375-1.893 1.461 0 2.155 1.043 2.155 2.473v9.93h5.699V14.065c0-3.864-2.156-6.376-5.809-6.376-1.899 0-3.506.812-4.42 1.894V8.076h-5.735v17.387ZM189.266 19.474c0 4.405 2.192 6.337 6.064 6.337 1.279 0 2.521-.232 3.178-.54v-5.14a4.697 4.697 0 0 1-1.826.387c-1.133 0-1.754-.58-1.754-1.932V12.79h3.434V8.076h-3.434V3.284h-5.662v4.792h-2.411v4.714h2.411v6.684Z"
                  fill="#fff"
                />
              </svg>
            </Link>
            <nav className="grid grid-cols-1 items-start gap-x-8 gap-y-8 py-8 sm:grid-cols-2 md:py-0 lg:gap-x-10 xl:grid-cols-4 xl:gap-x-14">
              {FooterData.map((column, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap font-GT_Alpina text-xl font-semibold text-white">
                    {column.name}
                  </h3>
                  {column.links.map((link, index) => (
                    <Link key={index} className="group whitespace-nowrap text-white" href={link.link}>
                      <div className="relative inline-block text-sm font-light">
                        {link.name}
                        <div className="absolute -bottom-0.5 left-0 right-0 h-[1px] w-0 bg-white duration-200 group-hover:w-full" />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
          <div className="max-w-full space-y-4 pb-16 pt-8 text-sm text-white-dark md:px-0 lg:px-0">
            <p>
              Al utilizar este sitio web, usted comprende que la información que se presenta, se proporciona solo con
              fines informativos y acepta nuestros{" "}
              <Link
                href={`${getConfigs("application").URLs.www}/legal/terms-and-conditions`}
                className="underline duration-200 hover:text-white">
                Términos y Condiciones de Uso
              </Link>
              , tanto como la{" "}
              <Link
                href={`${getConfigs("application").URLs.www}/legal/privacy-policy`}
                className="underline duration-200 hover:text-white">
                Política de Privacidad
              </Link>{" "}
              y sin excluir la{" "}
              <Link
                href={`${getConfigs("application").URLs.www}/legal/cookies-policy`}
                className="underline duration-200 hover:text-white">
                Política de Cookies.
              </Link>
            </p>
            <p>
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].legalName} (en adelante “
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}”) es una entidad
              debidamente registrada y legalmente constituida en{" "}
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].country}.
              <br />
              Cumplimos con todas las leyes y regulaciones aplicables en nuestra jurisdicción y operamos de acuerdo con
              los estándares legales y éticos más altos.
              <br />
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName} se encuentra
              registrada ante la Cámara de Comercio de Barranquilla bajo el número de registro{" "}
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].regId}
              , lo que confirma nuestra legitimidad como empresa.
              <br />
              Puedes tener plena confianza en nuestra legalidad y compromiso con el cumplimiento de todas las
              obligaciones legales. Informese más en el{" "}
              <Link
                href={`${getConfigs("application").URLs.www}/legal`}
                className="underline duration-200 hover:text-white">
                Aviso legal.
              </Link>
            </p>
            <p>
              {getConfigs("platform").name} es una subsidiaria de propiedad total de{" "}
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}.
            </p>
            <p>Copyright © 2023 {getConfigs("platform").name}, Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </>
  );
}
