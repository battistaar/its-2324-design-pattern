import { Types } from "mongoose";
import { User } from "../entities/user.schema";
import { CreateUserDTO } from "../entities/user.dto";
import { DataSource } from "@modules/utils/datasource";

export abstract class UserDataSource implements DataSource<User, CreateUserDTO> {
  abstract find(): Promise<User[]>;

  abstract get(id: Types.ObjectId | string): Promise<User>;

  abstract create(data: CreateUserDTO): Promise<User>;
}