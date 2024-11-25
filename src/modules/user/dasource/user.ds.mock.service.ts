import { Injectable, Optional } from "@nestjs/common";
import { Types } from "mongoose";
import { UserDataSource } from "./user.ds";
import { User } from "../entities/user.schema";
import { CreateUserDTO } from "../entities/user.dto";

@Injectable()
export class UserMockDataSource extends UserDataSource {
  constructor(@Optional() private data: User[] = []) {
    super();
  }

  setRecords(data: User[]) {
    this.data = data;
  }

  async find(): Promise<User[]> {
    return this.data;
  }

  async get(id: Types.ObjectId | string): Promise<User> {
    return this.data.find(e => e.id == id);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const id = new Types.ObjectId().toString();
    const record = {...data, id};
    this.data.push(record);
    return record;
  }
}