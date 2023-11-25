import { isBusinessHost } from "@guards/business";
import { UseTemplate } from "@templates/index";
import { Business } from "@typescript/models/business";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio"
};

interface Props {
  business: Business;
}

export default isBusinessHost(({ business }: Props) => (
  <UseTemplate template="Default" page="Index" data={{ business }} />
));
