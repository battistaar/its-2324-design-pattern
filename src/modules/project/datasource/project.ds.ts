import { DataSource } from "@modules/utils/datasource";
import { Types } from "mongoose";
import { Project } from "../entities/project.schema";
import { CreateProjectDTO } from "../entities/project.dto";

export abstract class ProjectDataSource implements DataSource<Project, CreateProjectDTO> {
  abstract find(): Promise<Project[]>;

  abstract get(id: Types.ObjectId | string): Promise<Project>;

  abstract create(data: CreateProjectDTO): Promise<Project>;
}