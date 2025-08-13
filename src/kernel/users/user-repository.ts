import type { FindAllUsersResult, GetUsersParams } from "./user-types.js";

export interface UserRepository {
  findAll(params: GetUsersParams): Promise<FindAllUsersResult>;
}
