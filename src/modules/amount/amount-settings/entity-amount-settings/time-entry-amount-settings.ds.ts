import { Injectable } from "@nestjs/common";
import { AmountSettingsMerger } from "../amount-settings.merger"
import { AmountSettings } from "../amount-settings.entity";
import { TimeEntry } from "@modules/time-entry";

@Injectable()
export class TimeEntryAmountSettings extends AmountSettingsMerger<TimeEntry> {

    protected async extractSettings(entity: TimeEntry): Promise<Partial<AmountSettings>> {
        return entity.settings.amount;
    }

}