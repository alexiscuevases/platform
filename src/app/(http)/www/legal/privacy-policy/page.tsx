import { Footer } from "../../_components/Footer";
import { Header } from "../../_components/Header";
import type { Metadata } from "next";
import Link from "next/link";
import { getConfigs } from "@helpers/getConfigs";

export const metadata: Metadata = {
  title: "Política de Privacidad"
};

export default function Page() {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <Header />
      <main>
        <div className="mx-auto max-w-[1140px] px-8 py-12 lg:px-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-light">Política de Privacidad</h1>
            <p className="font-light">
              <span className="font-normal">Última fecha de actualización:</span> 10 de noviembre, 2023
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Introducción</h2>
            <p>
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].legalName} (en adelante, &quot;
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}&quot;) se
              compromete a proteger y respetar su privacidad. Esta política de privacidad describe cómo recopilamos,
              utilizamos y protegemos la información proporcionada a través de nuestra plataforma de comercio
              electrónico para empresas (en adelante, la &quot;Plataforma&quot;). Le recomendamos que lea atentamente
              esta política para comprender cómo tratamos su información personal.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">1. Información que Recopilamos</h2>
            <p>Recopilamos la siguiente información cuando utiliza nuestra Plataforma:</p>
            <ul className="list-disc space-y-1 px-[18px]">
              <li>
                <span className="font-semibold">Información de Registro:</span> Cuando se registra en nuestra
                Plataforma, recopilamos información como el nombre de la empresa, el nombre del contacto, la dirección
                de correo electrónico, el número de teléfono y la dirección comercial.
              </li>
              <li>
                <span className="font-semibold">Información de la Cuenta:</span> Para brindarle acceso a la Plataforma,
                recopilamos información de inicio de sesión, incluyendo su nombre de usuario y contraseña.
              </li>
              <li>
                <span className="font-semibold">Información de Facturación:</span> Si realiza transacciones a través de
                nuestra Plataforma, recopilamos datos de facturación, como información de tarjeta de crédito o de pago.
              </li>
              <li>
                <span className="font-semibold">Información Operativa:</span> Recopilamos datos sobre cómo utiliza
                nuestra Plataforma, incluyendo las acciones que realiza, el contenido que envía y recibe, y las
                preferencias de configuración.
              </li>
              <li>
                <span className="font-semibold">Información Técnica:</span> Registramos información técnica, como su
                dirección IP, tipo de dispositivo, navegador web y sistema operativo.
              </li>
              <li>
                <span className="font-semibold">Información generada a través de cookies y tecnologías similares:</span>{" "}
                Consulte nuestra{" "}
                <Link
                  className="text-primary underline"
                  href={`${getConfigs("application").URLs.www}/legal/cookies-policy`}>
                  Política de Cookies
                </Link>{" "}
                para obtener más información.
              </li>
            </ul>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">2. Uso de la Información Personal</h2>
            <p>Utilizamos la información personal recopilada para los siguientes fines:</p>
            <ul className="list-disc space-y-1 px-[18px]">
              <li>Proporcionar y mantener la Plataforma y sus funcionalidades.</li>
              <li>Procesar transacciones y pagos.</li>
              <li>Brindar asistencia al cliente y soporte técnico.</li>
              <li>Personalizar su experiencia en la Plataforma y ofrecer contenido y ofertas relevantes.</li>
              <li>Cumplir con las obligaciones legales y reglamentarias.</li>
              <li>Mejorar y optimizar la Plataforma y su seguridad.</li>
            </ul>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">3. Compartir Información Personal</h2>
            <p>
              No vendemos ni alquilamos su información personal a terceros. Sin embargo, podemos compartir su
              información con terceros en las siguientes circunstancias:
            </p>
            <ul className="list-disc space-y-1 px-[18px]">
              <li>
                Con proveedores de servicios que nos ayudan a prestar nuestros servicios, como procesadores de pagos y
                servicios de alojamiento.
              </li>
              <li>Con terceros con los que haya acordado realizar transacciones a través de la Plataforma.</li>
              <li>
                Cuando sea necesario para cumplir con obligaciones legales, responder a solicitudes gubernamentales o
                proteger nuestros derechos y propiedades.
              </li>
              <li>Con su consentimiento previo para cualquier otro propósito.</li>
            </ul>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">4. Seguridad de la Información</h2>
            <p>
              Tomamos medidas razonables para proteger su información personal contra el acceso no autorizado, la
              divulgación, la alteración o la destrucción. Sin embargo, no podemos garantizar la seguridad absoluta de
              los datos en línea.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">5. Sus Derechos y Opciones</h2>
            <p>
              Usted tiene derechos con respecto a su información personal, que incluyen el acceso, la corrección y la
              eliminación de sus datos. Puede ejercer estos derechos poniéndose en contacto con nosotros a través de los
              datos de contacto proporcionados a continuación.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">6. Cambios en esta Política de Privacidad</h2>
            <p>
              Nos reservamos el derecho de actualizar y modificar esta política de privacidad en cualquier momento.
              Cualquier cambio se notificará a través de la Plataforma. Le recomendamos que revise esta política de
              privacidad periódicamente.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">7. Contacto</h2>
            <p>
              Si tienes alguna pregunta o inquietud con respecto a esta Política de Privacidad, no dudes en ponerte en
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
