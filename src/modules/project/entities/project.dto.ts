import { Type } from "class-transformer";
import { IsArray, IsDefined, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProjectAmountSettings, ProjectUserSettings } from "./project.entity";
import { HourlyRateSettings } from "@modules/amount/amount-settings";
import { Project } from "./project.schema";

class HourlyRateDTO implements HourlyRateSettings {
  @IsNumber()
  @IsOptional()
  hourlyRate: number;
}

class ProjectUserSettingsDTO implements ProjectUserSettings {
  @IsString()
  userId: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => HourlyRateDTO)
  settings: HourlyRateDTO;
}

class ProjectAmountSettingsDTO implements ProjectAmountSettings {
  @IsDefined()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => ProjectUserSettingsDTO)
  userSettings: ProjectUserSettingsDTO[];
}

class ProjectSettingsDTO {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectAmountSettingsDTO)
  amount: ProjectAmountSettingsDTO;
}

export class CreateProjectDTO {
  @IsString()
  name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectSettingsDTO)
  settings: ProjectSettingsDTO;

  @IsString()
  company: string;
}

export class ProjectResultDTO extends Project {}