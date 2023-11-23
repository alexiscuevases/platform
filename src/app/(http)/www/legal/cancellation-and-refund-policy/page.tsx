import { Footer } from "../../_components/Footer";
import { Header } from "../../_components/Header";
import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "settings";

export const metadata: Metadata = {
  title: "Política de Cancelación y Devolución"
};

export default function Page() {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <Header />
      <main>
        <div className="mx-auto max-w-[1140px] px-8 py-12 lg:px-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-light">Política de Cancelación y Devolución</h1>
            <p className="font-light">
              <span className="font-normal">Última fecha de actualización:</span> 10 de noviembre, 2023
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">1. Cancelación</h2>
            <p>
              <span className="font-bold">1.1 Cancelar Planes de Pago.</span> Los Usuarios que se suscriben a nuestros
              planes de pago pueden cancelar su suscripción en cualquier momento. La cancelación se puede llevar a cabo
              a través del panel de control de la cuenta del Usuario. Una vez cancelada la suscripción, se desactivarán
              las características del plan de pago al final del período de facturación actual.
            </p>
            <p>
              <span className="font-bold">1.2 Cancelar Planes de Gratuitos.</span> Nuestra plataforma ofrece un plan
              gratuito con características limitadas. Los Usuarios de este plan gratuito pueden cancelar su cuenta en
              cualquier momento.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">2. Reembolsos para Planes de Pago</h2>
            <p>
              <span className="font-bold">2.1 Reembolso en el Primer Mes.</span> Los Usuarios que cancelen su
              suscripción en el primer mes de uso podrán solicitar un reembolso completo del importe pagado.
            </p>
            <p>
              <span className="font-bold">2.2 Reembolso Después del Primer Mes.</span> Para los Usuarios que cancelen
              después del primer mes de uso, no se realizarán reembolsos por el período restante de la suscripción.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">3. Proceso de Devolución</h2>
            <p>
              Para solicitar un reembolso, los Usuarios deben comunicarse con nuestro equipo de soporte a través de{" "}
              <Link className="text-primary underline" href={`mailto:support@${getSettings("application").host}`}>
                support@{getSettings("application").host}
              </Link>
              y proporcionar la siguiente información:
            </p>
            <ul className="list-disc space-y-1 px-[18px]">
              <li>Nombre de usuario y dirección de correo electrónico asociada a la cuenta.</li>
              <li>Nombre del comercio al cúal le cancelará la suscripción.</li>
              <li>Razón de la cancelación.</li>
              <li>Fecha de cancelación.</li>
            </ul>
            <p>
              Una vez que se reciba la solicitud de cancelación y reembolso, el equipo de soporte procesará la solicitud
              en un plazo de 2 días laborables. Los reembolsos se realizarán utilizando el mismo método de pago que se
              utilizó para la compra.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">4. Cambios en la Política</h2>
            <p>
              Nos reservamos el derecho de modificar esta política de cancelación y devolución en cualquier momento. Los
              cambios se comunicarán a través de nuestro sitio web y se aplicarán a partir de la fecha de publicación.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">5. Contacto</h2>
            <p>
              Si tienes alguna pregunta o inquietud con respecto a esta Política de Cancelación y Devolución, no dudes
              en ponerte en contacto con nosotros a través de{" "}
              <Link className="text-primary underline" href={`mailto:help@${getSettings("application").host}`}>
                help@{getSettings("application").host}.
              </Link>
            </p>
          </div>
          <p className="text-sm font-light">
            Gracias por elegir {getSettings("platform").name} como tu plataforma de comercio electrónico. Estamos
            comprometidos a proporcionar una experiencia segura y eficiente para tu negocio.
            <br />
            <br />
            Atentamente, El equipo de{" "}
            {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
