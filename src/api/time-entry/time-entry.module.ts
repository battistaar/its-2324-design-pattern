import { Module } from "@nestjs/common";
import { TimeEntryController } from "./time-entry.controller";
import { TimeEntryResultFactory } from "./result.service";
import { TimeEntryResultCalculatorService } from './result-calculator.service';
import { DurationSettingsModule } from "@modules/duration/duration-settings";
import { DurationStrategyModule } from "@modules/duration/duration-strategy";
import { AmountSettingsModule } from "@modules/amount/amount-settings";
import { TimeEntryModule } from "@modules/time-entry";

@Module({
  imports: [
    DurationSettingsModule,
    DurationStrategyModule,
    AmountSettingsModule,
    TimeEntryModule
  ],
  controllers: [TimeEntryController],
  providers: [
    TimeEntryResultFactory,
    TimeEntryResultCalculatorService
  ]
})

export class TimeEntryApiModule {}