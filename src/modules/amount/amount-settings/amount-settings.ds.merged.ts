import { Injectable } from "@nestjs/common";
import { AmountSettingsDataSource, AmountSettingsProvider } from "./amount-settings.ds";
import { AmountSettings } from "./amount-settings.entity";
import { CompanyAmountSettings } from "./entity-amount-settings/company-amount-settings.ds";
import { UserAmountSettings } from "./entity-amount-settings/user-amount-settings.ds";
import { CompanyDataSource } from "@modules/company";
import { UserDataSource } from "@modules/user";

@Injectable()
export class AmountSettingsMergedDataSource extends AmountSettingsDataSource {
  constructor(
    protected companyDs: CompanyDataSource,
    protected userDs: UserDataSource
  ) {
    super();
  }

  async getAmountSettings(entityId: string): Promise<AmountSettings> {
    let settingsSrv: AmountSettingsProvider = new CompanyAmountSettings(this.companyDs);
    settingsSrv = new UserAmountSettings(settingsSrv, this.userDs, async (user) => user.company);

    return settingsSrv.getAmountSettings(entityId);
  }

}