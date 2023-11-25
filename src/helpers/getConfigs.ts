import { ApplicationConfigs } from "@configs/application";
import { BusinessConfigs } from "@configs/business";
import { LegalConfigs } from "@configs/legal";
import { PlatformConfigs } from "@configs/platform";

type ConfigsTS = typeof Configs;
const Configs = {
  application: ApplicationConfigs,
  business: BusinessConfigs,
  legal: LegalConfigs,
  platform: PlatformConfigs
};

export const getConfigs = <ConfigName extends keyof ConfigsTS>(ConfigName: ConfigName): ConfigsTS[ConfigName] => {
  // @ts-expect-error
  if (ConfigName === "application") return Configs.application;
  // @ts-expect-error
  else if (ConfigName === "business") return Configs.business;
  // @ts-expect-error
  else if (ConfigName === "legal") return Configs.legal;
  // @ts-expect-error
  else if (ConfigName === "platform") return Configs.platform;

  return {} as ConfigsTS[ConfigName];
};
