import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CompanyDataSource } from "./company.ds";
import { Company } from "../entities/company.schema";
import { CreateCompanyDTO } from "../entities/company.dto";

@Injectable()
export class CompanyMongoDataSource extends CompanyDataSource {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>) {
      super();
    }

  async find(): Promise<Company[]> {
    const list = await this.companyModel.find()
    return list.map(r => r.toObject());
  }

  async get(id: Types.ObjectId | string): Promise<Company> {
    return this.companyModel.findById(id)
      .then(record => record.toObject());
  }

  async create(data: CreateCompanyDTO): Promise<Company> {
    return this.companyModel.create(data)
      .then(record => record.toObject());
  }
}