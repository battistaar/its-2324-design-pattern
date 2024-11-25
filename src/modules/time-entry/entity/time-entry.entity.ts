import { HourlyRateSettings } from '@modules/amount/amount-settings';
import { TimeEntry } from './time-entry.schema';

export class CalculatedTimeEntry extends TimeEntry {
  amount: number;
}

export interface TimeEntryAmountSettings extends Partial<HourlyRateSettings> {}