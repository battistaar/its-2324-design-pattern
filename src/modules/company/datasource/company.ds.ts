import { CreateCompanyDTO } from "../entities/company.dto";
import { Company } from "../entities/company.schema";
import { Types } from "mongoose";

export abstract class CompanyDataSource {
  abstract find(): Promise<Company[]>;

  abstract get(id: Types.ObjectId | string): Promise<Company>;

  abstract create(data: CreateCompanyDTO): Promise<Company>;
}