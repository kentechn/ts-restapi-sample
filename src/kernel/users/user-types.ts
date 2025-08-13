export interface User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Repository層で使用する結果型
export interface FindAllUsersResult {
  users: User[];
  totalCount: number;
}

// UseCase層で使用する結果型
export interface GetUsersResult {
  users: User[];
  totalCount: number;
}

export interface GetUsersParams {
  offset: number;
  limit: number;
}
