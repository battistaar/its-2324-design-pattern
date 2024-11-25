import { AmountSettingsProvider } from "../amount-settings.ds";
import { Project, ProjectDataSource } from "@modules/project";
import { AmountSettings } from "../amount-settings.entity";

export class ProjectAmountSettings {
    constructor(
        protected previousSource: AmountSettingsProvider,
        protected datasource: ProjectDataSource,
        protected prevIdFn: (entity: Project) => Promise<string>
    ) {}


    async getAmountSettings(entityId: string, userId: string): Promise<AmountSettings> {
        const currEntity = await this.datasource.get(entityId);
        const currSettings = currEntity.settings.amount;
        const userSettings = currSettings.userSettings.find(i => i.userId === userId);

        const prevId = await this.prevIdFn(currEntity);
        const prevSettings = await this.previousSource.getAmountSettings(prevId);

        return Object.assign(prevSettings, userSettings);
    }
}


export class ProjectAmountServiceAdapter implements AmountSettingsProvider {
    constructor(
        protected baseSettingsProvider: ProjectAmountSettings,
        protected userId: string
    ) { }

    async getAmountSettings(entityId: string): Promise<AmountSettings> {
        return this.baseSettingsProvider.getAmountSettings(entityId, this.userId);
    }

}