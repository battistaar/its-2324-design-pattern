import { HourlyRateSettings } from "@modules/amount/amount-settings";

export interface ProjectUserSettings {
    userId: string;
    settings: Partial<HourlyRateSettings>;
}

export interface ProjectAmountSettings {
    userSettings: ProjectUserSettings[];
}