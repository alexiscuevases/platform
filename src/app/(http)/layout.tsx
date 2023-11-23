import "app/_theme/styles/globals.css";
import { GT_Alpina, Comfortaa } from "app/_theme/fonts";
import type { Metadata } from "next";
import { getSettings } from "settings";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: `%s · ${getSettings("platform").name}`,
    default: getSettings("platform").name
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
