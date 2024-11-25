import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProjectAmountSettings, ProjectUserSettings } from "./project.entity";
import { HourlyRateSettings } from "@modules/amount/amount-settings";

@Schema({_id: false})
class AmountUserSettings implements ProjectUserSettings {
    @Prop()
    userId: string;

    @Prop({type: {hourlyRate: Number}, _id: false})
    settings: Partial<HourlyRateSettings>;
}

const AmountUserSettingsSchema = SchemaFactory.createForClass(AmountUserSettings);

@Schema({_id: false})
class AmountSettings implements ProjectAmountSettings {

    @Prop({type: [AmountUserSettingsSchema]})
    userSettings: ProjectUserSettings[];
    
}

export const ProjectAmountSettingsSchema = SchemaFactory.createForClass(AmountSettings);
