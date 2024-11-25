import { Injectable } from "@nestjs/common";
import { AmountSettingsMerger } from "../amount-settings.merger";
import { User } from "@modules/user";
import { AmountSettings } from "../amount-settings.entity";

@Injectable()
export class UserAmountSettings extends AmountSettingsMerger<User> {

    protected async extractSettings(entity: User): Promise<Partial<AmountSettings>> {
        return entity.settings.amount;
    }

}