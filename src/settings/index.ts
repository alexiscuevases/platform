import { ApplicationSettings } from "./application";
import { BusinessSettings } from "./business";
import { LegalSettings } from "./legal";
import { PlatformSettings } from "./platform";

type SettingsInterface = typeof Settings;

const Settings = {
  application: ApplicationSettings,
  business: BusinessSettings,
  legal: LegalSettings,
  platform: PlatformSettings
};

export const getSettings = <T extends keyof SettingsInterface>(settings: T): SettingsInterface[T] => {
  // @ts-expect-error
  if (settings === "application") return Settings.application;
  // @ts-expect-error
  else if (settings === "business") return Settings.business;
  // @ts-expect-error
  else if (settings === "legal") return Settings.legal;
  // @ts-expect-error
  else if (settings === "platform") return Settings.platform;

  return {} as SettingsInterface[T];
};
