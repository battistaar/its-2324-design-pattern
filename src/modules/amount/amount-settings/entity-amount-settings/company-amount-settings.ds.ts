import { CompanyDataSource } from "@modules/company";
import { AmountSettings } from "../amount-settings.entity";
import { Injectable } from "@nestjs/common";
import { AmountSettingsDataSource } from "../amount-settings.ds";

@Injectable()
export class CompanyAmountSettings extends AmountSettingsDataSource {
    constructor(protected dt: CompanyDataSource) {
        super();
    }

    async getAmountSettings(entityId: string): Promise<AmountSettings> {
        const entity = await this.dt.get(entityId);
        return entity.settings.amount;
    }
}