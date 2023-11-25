import { getConfigs } from "@helpers/getConfigs";
import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal"
};

export default function Page() {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <Header />
      <main>
        <div className="mx-auto max-w-[1140px] px-8 py-12 lg:px-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-light">Aviso Legal</h1>
            <p className="font-light">
              <span className="font-normal">Última fecha de actualización:</span> 10 de noviembre, 2023
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Constitución de la Empresa</h2>
            <div className="space-y-1">
              <p>
                <span className="font-bold">Nombre Legal de la Empresa:</span>{" "}
                {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].legalName}
              </p>
              <p>
                <span className="font-bold">Nombre Comercial de la Empresa:</span>{" "}
                {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}
              </p>
              <p>
                <span className="font-bold">Tipo de Empresa:</span> Sociedad por Acciones Simplificadas (S.A.S.)
              </p>
              <p>
                <span className="font-bold">Fecha de Constitución:</span> 10 de noviembre, 2023
              </p>
              <p>
                <span className="font-bold">Registro Comercial:</span>{" "}
                {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].legalName} se encuentra
                debidamente registrada en la Cámara de Comercio de Barranquilla, bajo el número de registro{" "}
                {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].regId}
              </p>
              <p>
                <span className="font-bold">Legislación Aplicable:</span>{" "}
                {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].legalName} opera de acuerdo
                con todas las leyes y regulaciones aplicables en Colombia
              </p>
            </div>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Descripción de la Empresa</h2>
            <p>
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].legalName} (en adelante, &quot;
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}&quot;) es una
              empresa dedicada a proporcionar una plataforma de comercio electrónico que permite a negocios y
              emprendedores crear, administrar y promocionar tiendas en línea, procesar transacciones de pago y
              gestionar inventarios. Nuestra plataforma ofrece tanto planes de pago como gratuitos para satisfacer las
              necesidades de una amplia variedad de clientes.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Propósito del Aviso de Legalidad</h2>
            <p>
              Este Aviso de Legalidad tiene como objetivo informar al público en general, a los usuarios de nuestra
              plataforma y a las partes interesadas sobre los términos y las políticas que rígen a{" "}
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName}, así como sobre
              su existencia como entidad legal.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Términos</h2>
            <p>
              <span className="font-bold">
                El uso de nuestra plataforma se rige por nuestros Términos y Condiciones de Uso.
              </span>{" "}
              Estos términos regulan aspectos como la creación de cuentas de usuario, la privacidad, la propiedad
              intelectual y la responsabilidad del usuario. Los Términos y Condiciones están disponibles en{" "}
              <Link
                className="text-primary underline"
                href={`${getConfigs("application").URLs.www}/legal/terms-and-conditions`}>
                Términos y Condiciones de Uso.
              </Link>
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Políticas</h2>
            <p>
              <span className="font-bold">Respetamos tu privacidad y protegemos tus datos personales.</span> Nuestra{" "}
              <Link
                className="text-primary underline"
                href={`${getConfigs("application").URLs.www}/legal/privacy-policy`}>
                Política de Privacidad
              </Link>{" "}
              describe cómo recopilamos, utilizamos y protegemos tus datos.
            </p>
            <p>
              <span className="font-bold">
                Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario en nuestra
                plataforma.
              </span>{" "}
              Nuestra{" "}
              <Link
                className="text-primary underline"
                href={`${getConfigs("application").URLs.www}/legal/cookies-policy`}>
                Política de Cookies
              </Link>{" "}
              detalla cómo utilizamos estas tecnologías y cómo los usuarios pueden gestionar sus preferencias de
              cookies.
            </p>
            <p>
              <span className="font-bold">Usted puede cancelar su suscripción en cualquier momento.</span> Nuestra{" "}
              <Link
                className="text-primary underline"
                href={`${getConfigs("application").URLs.www}/legal/cancellation-and-refund-policy`}>
                Política de Cancelación y Devolución
              </Link>{" "}
              detalla cómo puede realizar la cancelación de cualquier suscripción a un plan de pago siempre y cuando se
              cumpla con dicha Política.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Comunicación</h2>
            <p>
              Toda comunicación entre{" "}
              {getConfigs("legal").constitutions[getConfigs("legal").main_constitution].commercialName} y los Usuarios
              se llevará a cabo a través de los datos de contacto proporcionados por el usuario al registrarse en la
              plataforma. Es responsabilidad del usuario mantener estos datos actualizados.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Cambios en las Políticas y Términos</h2>
            <p>
              Nos reservamos el derecho de modificar nuestros términos y políticas en cualquier momento. Los cambios se
              comunicarán a través de nuestra plataforma y entrarán en vigencia en la fecha de publicación.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Información de Contacto</h2>
            <p>
              Si tienes alguna pregunta o inquietud con respecto a este aviso de legalidad, cualquiera de nuestras
              políticas o términos, no dudes en ponerte en contacto con nosotros a través de{" "}
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
