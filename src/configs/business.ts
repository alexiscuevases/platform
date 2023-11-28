import { ApplicationConfigs } from "./application";
import { PlatformConfigs } from "./platform";

export const BusinessConfigs = {
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
  namesNotAllowed: [PlatformConfigs.name],
  subdomainsNotAllowed: ["www", "app", "api", "blog", "developers", "investors", "webhook"],
  domainsNotAllowed: [ApplicationConfigs.host]
};
