import { IsDefined, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { CompanyAmountSettings } from "./company.entity";
import { Type } from "class-transformer";

class CompanyAmountSettingsDTO implements CompanyAmountSettings {
    @IsNumber()
    minDuration: number;
    
    @IsNumber()
    hourlyRate: number;
}

class CompanySettingsDTO {
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => CompanyAmountSettingsDTO)
    amount: CompanyAmountSettingsDTO;
}

export class CreateCompanyDTO {
    @IsString()
    name: string;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => CompanySettingsDTO)
    settings: CompanySettingsDTO;
}