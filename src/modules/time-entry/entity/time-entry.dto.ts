import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { TimeEntry } from "./time-entry.schema";
import { TimeEntryAmountSettings } from "./time-entry.entity";
class AmountSettingsDTO implements TimeEntryAmountSettings {
  @IsOptional()
  @IsNumber()
  hourlyRate?: number;
}

class TimeEntrySettingsDTO {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AmountSettingsDTO)
  amount: AmountSettingsDTO
}
export class CreateTimeEntryDTO {
  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  start: Date;

  @IsDate()
  @Type(() => Date)
  end: Date; 

  @IsBoolean()
  billable: boolean;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => TimeEntrySettingsDTO)
  settings: TimeEntrySettingsDTO

  @IsString()
  user: string;

  @IsString()
  company: string;
}

export class TimeEntryResultDTO extends TimeEntry {
  amount: number;
}