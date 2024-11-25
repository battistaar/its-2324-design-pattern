import { Company } from "@modules/company";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { UserAmountSettings } from "./user.entity";

@Schema({_id: false})
class AmountSettings implements UserAmountSettings {
    @Prop()
    hourlyRate: number;
}

const AmountSettingsSchema = SchemaFactory.createForClass(AmountSettings);

@Schema({toJSON: {virtuals: true}, toObject: {virtuals: true}})
export class User {
    id: string;

    @Prop()
    name: string;

    @Prop({type: {amount: AmountSettingsSchema}})
    settings: {
        amount: UserAmountSettings
    };

    @Prop({type: MongooseSchema.Types.ObjectId, ref: Company.name})
    company: string;
}

export const UserSchema = SchemaFactory.createForClass(User);