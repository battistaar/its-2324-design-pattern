import { AmountSettings } from "@modules/amount/amount-settings";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CompanyAmountSettings } from "./company.entity";

export type CompanyDocument = HydratedDocument<Company>;

@Schema({_id: false})
class CAmountSetting implements CompanyAmountSettings {
    @Prop()
    hourlyRate: number;

    @Prop()
    minDuration: number;
}
const AmountSettingsSchema = SchemaFactory.createForClass(CAmountSetting);

@Schema({toObject: {virtuals: true}, toJSON: {virtuals: true}})
export class Company {
    id: string;

    @Prop()
    name: string;

    @Prop({
        type: {
            amount: AmountSettingsSchema
        }
    })
    settings:  {
        amount: AmountSettings
    }
}
export const CompanySchema = SchemaFactory.createForClass(Company);