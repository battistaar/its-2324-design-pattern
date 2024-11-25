import { Company } from '@modules/company';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { TimeEntryAmountSettings } from './time-entry.entity';
import { User } from '@modules/user';

export type TimeEntryDocument = HydratedDocument<TimeEntry>;

@Schema({_id: false})
class AmountSettings implements TimeEntryAmountSettings {
    @Prop()
    hourlyRate: number;
}

const AmountSettingsSchema = SchemaFactory.createForClass(AmountSettings);


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

  @Prop({type: {amount: AmountSettingsSchema}})
  settings: {
      amount: TimeEntryAmountSettings
  };

  @Prop({type: MongooseSchema.Types.ObjectId, ref: User.name})
  user: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: Company.name})
  company: string;
}

export const TimeEntrySchema = SchemaFactory.createForClass(TimeEntry);
