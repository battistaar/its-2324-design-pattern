import { Injectable } from "@nestjs/common";
import { AmountSettingsDataSource, AmountSettingsProvider } from "./amount-settings.ds";
import { AmountSettings } from "./amount-settings.entity";
import { CompanyAmountSettings } from "./entity-amount-settings/company-amount-settings.ds";
import { UserAmountSettings } from "./entity-amount-settings/user-amount-settings.ds";
import { CompanyDataSource } from "@modules/company";
import { UserDataSource } from "@modules/user";
import { TimeEntryDataSource } from "@modules/time-entry";
import { TimeEntryAmountSettings } from "./entity-amount-settings/time-entry-amount-settings.ds";
import { ProjectAmountServiceAdapter, ProjectAmountSettings } from "./entity-amount-settings/project-amount-settings.ds";
import { ProjectDataSource } from "@modules/project";

@Injectable()
export class AmountSettingsMergedDataSource extends AmountSettingsDataSource {
  constructor(
    protected companyDs: CompanyDataSource,
    protected userDs: UserDataSource,
    protected projectDs: ProjectDataSource,
    protected timeEntryDs: TimeEntryDataSource
  ) {
    super();
  }

  async getAmountSettings(entityId: string): Promise<AmountSettings> {
    const timeEntry = await this.timeEntryDs.get(entityId);
    let settingsSrv: AmountSettingsProvider = new CompanyAmountSettings(this.companyDs);
    settingsSrv = new UserAmountSettings(settingsSrv, this.userDs, async (user) => user.company);
    const projectProvider = new ProjectAmountSettings(settingsSrv, this.projectDs, async () => timeEntry.user);
    settingsSrv = new ProjectAmountServiceAdapter(projectProvider, timeEntry.user);
    settingsSrv = new TimeEntryAmountSettings(settingsSrv, this.timeEntryDs, async (timeEntry) => timeEntry.user);

    return settingsSrv.getAmountSettings(entityId);
  }

}