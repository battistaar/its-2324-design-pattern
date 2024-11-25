import { Injectable, Optional } from "@nestjs/common";
import { Types } from "mongoose";
import { CompanyDataSource } from "./company.ds";
import { Company } from "../entities/company.schema";
import { CreateCompanyDTO } from "../entities/company.dto";

@Injectable()
export class CompanyMockDataSource extends CompanyDataSource {
  constructor(@Optional() private data: Company[] = []) {
    super();
  }

  setRecords(data: Company[]) {
    this.data = data;
  }

  async find(): Promise<Company[]> {
    return this.data;
  }

  async get(id: Types.ObjectId | string): Promise<Company> {
    return this.data.find(e => e.id == id);
  }

  async create(data: CreateCompanyDTO): Promise<Company> {
    const id = new Types.ObjectId().toString();
    const record = {...data, id};
    this.data.push(record);
    return record;
  }
}