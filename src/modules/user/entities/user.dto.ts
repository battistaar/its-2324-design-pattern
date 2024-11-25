import { IsDefined, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserAmountSettings } from "./user.entity";
import { Type } from "class-transformer";

class AmountSettingsDTO implements UserAmountSettings {
    @IsOptional()
    @IsNumber()
    hourlyRate?: number;
}

class UserSettingsDTO {
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => AmountSettingsDTO)
    amount: AmountSettingsDTO
}

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => UserSettingsDTO)
    settings: UserSettingsDTO

    @IsString()
    company: string;
}