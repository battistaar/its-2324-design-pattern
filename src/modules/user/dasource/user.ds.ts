import { Types } from "mongoose";
import { User } from "../entities/user.schema";
import { CreateUserDTO } from "../entities/user.dto";

export abstract class UserDataSource {
  abstract find(): Promise<User[]>;

  abstract get(id: Types.ObjectId | string): Promise<User>;

  abstract create(data: CreateUserDTO): Promise<User>;
}