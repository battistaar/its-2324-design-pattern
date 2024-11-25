import { Injectable, Optional } from "@nestjs/common";
import { Types } from "mongoose";
import { ProjectDataSource } from "./project.ds";
import { Project } from "../entities/project.schema";
import { CreateProjectDTO } from "../entities/project.dto";

@Injectable()
export class CompanyMockDataSource extends ProjectDataSource {
  constructor(@Optional() private data: Project[] = []) {
    super();
  }

  setRecords(data: Project[]) {
    this.data = data;
  }

  async find(): Promise<Project[]> {
    return this.data;
  }

  async get(id: Types.ObjectId | string): Promise<Project> {
    return this.data.find(e => e.id == id);
  }

  async create(data: CreateProjectDTO): Promise<Project> {
    const id = new Types.ObjectId().toString();
    const record = {...data, id};
    this.data.push(record);
    return record;
  }
}