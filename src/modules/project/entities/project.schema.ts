import { Company } from "@modules/company";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';
import { ProjectAmountSettings } from "./project.entity";
import { ProjectAmountSettingsSchema } from "./project-sub.schema";

@Schema({toObject: {virtuals: true}, toJSON: {virtuals: true}})
export class Project {
    id: string;

    @Prop()
    name: string;

    @Prop({
        type: {
            amount: ProjectAmountSettingsSchema
        },
        _id: false
    })
    settings: {
        amount: ProjectAmountSettings
    };

    @Prop({type: MongooseSchema.Types.ObjectId, ref: Company.name})
    company: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);