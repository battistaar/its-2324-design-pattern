import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ProjectDataSource } from "./project.ds";
import { Project } from "../entities/project.schema";
import { CreateProjectDTO } from "../entities/project.dto";

@Injectable()
export class ProjectMongoDataSource extends ProjectDataSource {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>) {
      super();
    }

  async find(): Promise<Project[]> {
    const list = await this.projectModel.find()
    return list.map(r => r.toObject());
  }

  async get(id: Types.ObjectId | string): Promise<Project> {
    return this.projectModel.findById(id)
      .then(record => record.toObject());
  }

  async create(data: CreateProjectDTO): Promise<Project> {
    return this.projectModel.create(data)
      .then(record => record.toObject());
  }
}