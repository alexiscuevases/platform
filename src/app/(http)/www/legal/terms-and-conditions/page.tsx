import { Footer } from "../../_components/Footer";
import { Header } from "../../_components/Header";
import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "settings";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso"
};

export default function Page() {
  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-ambient-peach to-ambient-lavender">
      <Header />
      <main>
        <div className="mx-auto max-w-[1140px] px-8 py-12 lg:px-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-light">Términos y Condiciones de Uso</h1>
            <p className="font-light">
              <span className="font-normal">Última fecha de actualización:</span> 10 de noviembre, 2023
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">Introducción</h2>
            <p>
              Estos Términos y Condiciones (en adelante, los &quot;Términos&quot;) regulan el uso de la plataforma de
              comercio electrónico (en adelante, la &quot;Plataforma&quot;) proporcionada por{" "}
              {getSettings("legal").constitutions[getSettings("legal").main_constitution].legalName} (en adelante,
              &quot;
              {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName}&quot;) a los
              usuarios (en adelante, los &quot;Usuarios&quot; o el &quot;Usuario&quot;).
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar la Plataforma, los Usuarios aceptan estos Términos en su totalidad. Si no están de
              acuerdo con estos Términos, no deben usar la Plataforma.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">2. Registro de Cuentas y Comercios</h2>
            <p>
              <span className="font-bold">2.1 Registro de Cuenta.</span> Para acceder y utilizar nuestra plataforma,
              usted debe registrarse y crear una cuenta. Usted es responsable de mantener la confidencialidad de su
              información de inicio de sesión y de garantizar la seguridad de su cuenta.
            </p>
            <p>
              <span className="font-bold">2.2 Registro de Comercio.</span> Para registrar su establecimiento o tienda en
              nuestra Plataforma, esta debe ser una entidad comercial legalmente registrada (en adelante, el
              &quot;Comercio&quot;). El Usuario garantiza que está autorizado para celebrar contratos en nombre del
              Comercio.
            </p>
            <p>
              <span className="font-bold">2.3 Requisitos de Elegibilidad.</span> Al registrar una Cuenta o un Comercio,
              usted declara proporcionar información precisa y actualizada.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">3. Nuestros Planes</h2>
            <p>
              <span className="font-bold">3.1 Los Planes.</span> La Plataforma ofrece planes de pago y gratuitos. Los
              detalles de cada plan, incluyendo precios, comisiones y características, se proporcionan en la página de{" "}
              <Link className="text-primary underline" href={`${getSettings("application").URLs.www}/prices`}>
                Precios.
              </Link>
            </p>
            <p>
              <span className="font-bold">3.2 Cambios en los Planes.</span>{" "}
              {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName} se reserva el
              derecho de cambiar los precios, las comisiones y las características de cada Plan en cualquier momento.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">4. Cancelación y Devolución</h2>
            <p>
              <span className="font-bold">4.1 Política de Cancelación y Devolución.</span> Los Usuarios con Comercios
              suscritos a planes de pago pueden cancelar su suscripción en cualquier momento. Siempre y cuando se cumpla
              con la{" "}
              <Link
                className="text-primary underline"
                href={`${getSettings("application").URLs.www}/legal/cancellation-and-refund-policy`}>
                Política de Cancelación y Devolución.
              </Link>
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">5. Uso de la Plataforma</h2>
            <p>
              <span className="font-bold">5.1 Uso Adecuado.</span> Usted se compromete a utilizar nuestra plataforma de
              manera adecuada y cumplir con todas las leyes y regulaciones aplicables. No debe utilizar nuestra
              plataforma con fines ilegales, no éticos o no autorizados.
            </p>
            <p>
              <span className="font-bold">5.2 Acceso y Soporte.</span> Proporcionaremos acceso a nuestra plataforma y,
              según lo acordado, servicios de soporte al cliente.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">6. Obligaciones del Usuario</h2>
            <p>
              <span className="font-bold">6.1 Contenido del Usuario.</span> Usted es el único responsable del contenido
              que publica o envía a través de nuestra plataforma. No debe publicar contenido que sea ilegal,
              difamatorio, obsceno o que viole los derechos de propiedad intelectual de terceros.
            </p>
            <p>
              <span className="font-bold">6.2 Respaldo de Datos.</span> Es su responsabilidad realizar copias de
              seguridad de su contenido y datos. No seremos responsables por la pérdida de datos o contenido.
            </p>
            <p>
              <span className="font-bold">6.3 Actualización de Datos.</span> Usted nos garantiza qué mantendrá
              periodicamente actualizados sus datos personales y, también nos garantiza la actualización períodica de
              los datos de sus Comercios registrados en la Plataforma.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">7. Propiedad Intelectual</h2>
            <p>
              <span className="font-bold">
                7.1 Derechos de Propiedad de{" "}
                {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName}.
              </span>{" "}
              Todos los contenidos, diseños, logotipos, marcas y cualquier otro material relacionado con nuestra
              Plataforma son propiedad exclusiva de{" "}
              {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName} o de terceros
              con licencia. No está autorizado a utilizar, copiar o distribuir ningún material sin nuestro permiso.
            </p>
            <p>
              <span className="font-bold">7.2 Derechos de Propiedad del Cliente.</span> Todos los contenidos, diseños,
              logotipos, marcas y cualquier otro material relacionado con el Cliente es propiedad exclusiva del Cliente
              o de terceros con licencia.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">8. Privacidad</h2>
            <p>
              <span className="font-bold">8.1 Política de Privacidad.</span> Nuestra{" "}
              <Link
                className="text-primary underline"
                href={`${getSettings("application").URLs.www}/legal/privacy-policy`}>
                Política de Privacidad
              </Link>{" "}
              describe cómo recopilamos, utilizamos y protegemos la información proporcionada a través de nuestra
              plataforma. Al utilizar nuestra plataforma, usted acepta nuestras prácticas de privacidad.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">9. Tarifas y Pagos</h2>
            <p>
              <span className="font-bold">9.1 Tarifas.</span> El uso de nuestra plataforma puede estar sujeto a tarifas.
              Las tarifas se describen en un acuerdo separado o en nuestra página de{" "}
              <Link className="text-primary underline" href={`${getSettings("application").URLs.www}/prices`}>
                Precios.
              </Link>
            </p>
            <p>
              <span className="font-bold">9.2 Pagos.</span> Los Usuarios son concientes y autorizan el pago de cualquier
              tarifa. Las tarifas qué los Usuarios pagarán a{" "}
              {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName} se describen
              en un acuerdo separado o en nuestra página de{" "}
              <Link className="text-primary underline" href={`${getSettings("application").URLs.www}/prices`}>
                Precios.
              </Link>
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">10. Limitación de Responsabilidad</h2>
            <p>
              <span className="font-bold">10.1 Exclusión de Garantías.</span> Nuestra plataforma se proporciona
              &quot;tal cual&quot; y &quot;según disponibilidad&quot;, sin garantías de ningún tipo, ya sean expresas o
              implícitas. No garantizamos la exactitud, confiabilidad o disponibilidad de nuestra plataforma.
            </p>
            <p>
              <span className="font-bold">10.2 Limitación de Responsabilidad.</span> En la medida permitida por la ley,
              no seremos responsables por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos
              que surjan del uso de nuestra plataforma.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">11. Términación</h2>
            <p>
              {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName} se reserva el
              derecho de terminar la cuenta de cualquier Usuario o Comercio en caso de incumplimiento de estos Términos.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">12. Ley Aplicable</h2>
            <p>
              Estos Términos se rigen por las leyes de{" "}
              {getSettings("legal").constitutions[getSettings("legal").main_constitution].commercialName}. Cualquier
              disputa se resolverá en los tribunales de nuestra jurisdicción.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">13. Modificaciones en los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. Cualquier cambio se notificará
              a través de nuestra plataforma. Es su responsabilidad revisar estos Términos periódicamente.
            </p>
          </div>
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl font-medium">14. Contacto</h2>
            <p>
              Si tienes alguna pregunta o inquietud con respecto a estos Términos, no dudes en ponerte en contacto con
              nosotros a través de{" "}
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
