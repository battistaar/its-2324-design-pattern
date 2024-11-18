import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TimeEntry } from './time-entry.schema';
import { CalculatedTimeEntry } from './time-entry.entity';
import { CreateTimeEntryDTO } from './time-entry.dto';
import { TimeEntryDataSource } from './datasource/time-entry.ds';
import { TimeEntryResultCalculatorService } from './result-calculator.service';

const FAKE_USER = '1234';

@Controller('time-entries')
export class TimeEntryController {
  constructor(
    private readonly timeEntryDs: TimeEntryDataSource,
    private readonly resultCalculatorSrv: TimeEntryResultCalculatorService
  ) {}

  @Get()
  async list(): Promise<CalculatedTimeEntry[]> {
    const list: TimeEntry[] = await this.timeEntryDs.find();
    
    const promises =  list.map((e) => {
      return this.resultCalculatorSrv.calcResult(FAKE_USER, e);
    });
    return Promise.all(promises);
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    const record: TimeEntry = await this.timeEntryDs.get(id);
    if (!record) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.resultCalculatorSrv.calcResult(FAKE_USER, record);
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() createTimeEntryDTO: CreateTimeEntryDTO) {
    const record: TimeEntry = await this.timeEntryDs.create(createTimeEntryDTO);

    return this.resultCalculatorSrv.calcResult(FAKE_USER, record);
  }
}
