import { BusinessApiResponseInterface } from "interfaces";
import { isBusinessHost } from "guards";
import { Metadata } from "next";
import { UseTemplate } from "app/_templates";

export const metadata: Metadata = {
  title: "Inicio"
};

interface Props {
  business: BusinessApiResponseInterface;
}

export default isBusinessHost(({ business }: Props) => (
  <UseTemplate template="Default" page="Index" data={{ business }} />
));
