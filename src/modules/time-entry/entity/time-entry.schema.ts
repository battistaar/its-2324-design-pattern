import { Company } from '@modules/company';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type TimeEntryDocument = HydratedDocument<TimeEntry>;

@Schema({toObject: {virtuals: true}})
export class TimeEntry {
  id: string;

  @Prop()
  description: string;

  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop()
  billable: boolean;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: Company.name})
  company: string;
}

export const TimeEntrySchema = SchemaFactory.createForClass(TimeEntry);
