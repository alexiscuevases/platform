import { ApplicationConfigs } from "@configs/application";
import { BusinessConfigs } from "@configs/business";
import { LegalConfigs } from "@configs/legal";
import { PlatformConfigs } from "@configs/platform";

type Configs = typeof Configs;
const Configs = {
  application: ApplicationConfigs,
  business: BusinessConfigs,
  legal: LegalConfigs,
  platform: PlatformConfigs
};

export const getConfigs = <T extends keyof Configs>(Configs: T): Configs[T] => {
  // @ts-expect-error
  if (Configs === "application") return Configs.application;
  // @ts-expect-error
  else if (Configs === "business") return Configs.business;
  // @ts-expect-error
  else if (Configs === "legal") return Configs.legal;
  // @ts-expect-error
  else if (Configs === "platform") return Configs.platform;

  return {} as Configs[T];
};
