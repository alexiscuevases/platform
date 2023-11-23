import "app/_theme/styles/globals.css";
import { comfortaa } from "app/_theme/fonts";
import { ReactNode } from "react";
import { type Metadata } from "next";
import { getBusinesses } from "services";
import { getSettings } from "settings";
import { cookies } from "next/headers";

interface Props {
  params: {
    host: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const business = await getBusinesses(
    params.host.includes(".") ? { business_custom_domain: params.host } : { business_local_subdomain: params.host }
  );

  if (!business.success || !business.result[0])
    return {
      title: `Not found · ${getSettings("platform").name}`
    };

  return {
    title: {
      template: `%s · ${business.result[0].business_name}`,
      default: business.result[0].business_name
    },
    other: {
      business_id: business.result[0]._id
    }
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const languageCookie = cookieStore.get(getSettings("application").cookies.language.name);

  return (
    <html lang={languageCookie ? languageCookie.value : "en"} className={comfortaa.variable}>
      <body className="font-comfortaa">{children}</body>
    </html>
  );
}
