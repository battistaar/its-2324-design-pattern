import { DataSource } from "@modules/utils/datasource";
import { AmountSettingsProvider } from "./amount-settings.ds";
import { AmountSettings } from "./amount-settings.entity";

export abstract class AmountSettingsMerger<T> implements AmountSettingsProvider {
    constructor(
        protected previousSource: AmountSettingsProvider,
        protected datasource: DataSource<T, unknown>,
        protected prevIdFn: (entity: T) => Promise<string>
    ) {}

    protected abstract extractSettings(entity: T): Promise<Partial<AmountSettings>>;

    async getAmountSettings(entityId: string): Promise<AmountSettings> {
        const currEntity = await this.datasource.get(entityId);
        const currSettings = await this.extractSettings(currEntity);

        const prevId = await this.prevIdFn(currEntity);
        const prevSettings = await this.previousSource.getAmountSettings(prevId);

        return Object.assign(prevSettings, currSettings);
    }
}