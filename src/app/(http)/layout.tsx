import "@resources/styles/globals.css";
import { getConfigs } from "@helpers/getConfigs";
import { Comfortaa, GT_Alpina } from "@resources/fonts";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: `%s · ${getConfigs("platform").name}`,
    default: getConfigs("platform").name
  }
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es" className={`${GT_Alpina.variable} ${Comfortaa.variable}`}>
      <body>{children}</body>
    </html>
  );
}
