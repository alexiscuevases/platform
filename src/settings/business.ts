import { ApplicationSettings } from "./application";
import { PlatformSettings } from "./platform";

export const BusinessSettings = {
  types: [
    {
      ref: "Natural person",
      name: "Persona natural",
      description: "Una persona natural es un individuo que asume todas sus obligaciones de manera personal"
    },
    {
      ref: "Legal person",
      name: "Persona jurídica",
      description:
        "Una persona jurídica es una entidad que puede estar conformada por una o más personas y cuyas obligaciones son asumidas por el patrimonio de la empresa"
    }
  ],
  namesNotAllowed: [PlatformSettings.name],
  subdomainsNotAllowed: ["www", "app", "api", "blog", "developers", "investors"],
  domainsNotAllowed: [ApplicationSettings.host]
};
