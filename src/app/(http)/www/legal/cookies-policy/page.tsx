import { Footer } from "../../_components/Footer";
import { Header } from "../../_components/Header";
import type { Metadata } from "next";
import Link from "next/link";
import { getConfigs } from "@helpers/getConfigs";

export const metadata: Metadata = {
  title: "Política de Cookies"
};

export default function Page() {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <Header />
      <main>
        <div className="mx-auto max-w-[1140px] px-8 py-12 lg:px-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-light">Política de Cookies</h1>
            <p className="font-light">
              <span className="font-normal">Última fecha de actualización:</span> 10 de noviembre, 2023
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">1. Introducción</h2>
            <p>
              Esta Política de Cookies (en adelante, la &quot;Política&quot;) es aplicable a nuestra plataforma de
              comercio electrónico (en adelante, la &quot;Plataforma&quot;) proporcionada por{" "}
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].legalName}
              (en adelante, &quot;
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}&quot;). En esta
              Política, explicamos qué son las cookies, cómo las utilizamos en nuestra Plataforma y cómo los usuarios
              pueden gestionar sus preferencias de cookies.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">2. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un
              sitio web. Estas cookies permiten que el sitio web reconozca el dispositivo del usuario y recopile
              información sobre su actividad en línea.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">3. Tipos de Cookies</h2>
            <p>
              <span className="font-bold">3.1 Cookies Estrictamente Necesarias.</span> Estas cookies son esenciales para
              el funcionamiento de nuestra plataforma. No pueden ser desactivadas en nuestros sistemas. Normalmente, se
              configuran en respuesta a las acciones realizadas por los usuarios, como iniciar sesión, completar
              formularios o configurar preferencias.
            </p>
            <p>
              <span className="font-bold">3.2 Cookies de Rendimiento.</span> Estas cookies nos permiten recopilar
              información sobre cómo los usuarios interactúan con nuestra plataforma, como las páginas visitadas y los
              enlaces en los que hacen clic. Esta información se utiliza para mejorar el rendimiento y la usabilidad de
              la plataforma.
            </p>
            <p>
              <span className="font-bold">3.3 Cookies de Funcionalidad.</span> Estas cookies permiten que la plataforma
              recuerde las elecciones y preferencias de los usuarios, como el idioma y la región. También se utilizan
              para proporcionar características más avanzadas y personalizadas.
            </p>
            <p>
              <span className="font-bold">3.4 Cookies de Publicidad.</span> Estas cookies se utilizan para mostrar
              anuncios relevantes para los usuarios en función de sus intereses y comportamiento de navegación en línea.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">4. Uso de Cookies en Nuestra Plataforma</h2>
            <p>La Plataforma utiliza cookies para:</p>
            <ul className="list-disc space-y-1 px-[18px]">
              <li>Proporcionar funcionalidades esenciales en la plataforma.</li>
              <li>Recopilar datos de rendimiento para mejorar la experiencia del usuario.</li>
              <li>Personalizar la experiencia del usuario y recordar sus preferencias.</li>
              <li>Mostrar anuncios relevantes.</li>
            </ul>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">5. Control de Cookies</h2>
            <p>
              Los usuarios pueden gestionar sus preferencias de cookies a través de la configuración de su navegador. La
              mayoría de los navegadores permiten a los usuarios aceptar, rechazar o eliminar cookies. Sin embargo,
              tenga en cuenta que la desactivación de cookies estrictamente necesarias puede afectar la funcionalidad de
              la plataforma.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">6. Cambios en la Política de Cookies</h2>
            <p>
              Nos reservamos el derecho de actualizar y modificar esta Política en cualquier momento. Cualquier cambio
              se notificará a través de la Plataforma. Le recomendamos que revise esta Política periódicamente.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">7. Pólitica de Privacidad</h2>
            <p>
              Esta Política de Cookies debe leerse junto con nuestra Política de Privacidad, disponible en{" "}
              <Link className="text-primary underline" href={`${getConfigs("application").URLs.www}/prices`}>
                Política de Privacidad.
              </Link>
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">8. Contacto</h2>
            <p>
              Si tienes alguna pregunta o inquietud con respecto a esta Política de Cookies, no dudes en ponerte en
              contacto con nosotros a través de{" "}
              <Link className="text-primary underline" href={`mailto:help@${getConfigs("application").host}`}>
                help@{getConfigs("application").host}.
              </Link>
            </p>
          </div>
          <p className="text-sm font-light">
            Gracias por elegir {getConfigs("platform").name} como tu plataforma de comercio electrónico. Estamos
            comprometidos a proporcionar una experiencia segura y eficiente para tu negocio.
            <br />
            <br />
            Atentamente, El equipo de{" "}
            {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
