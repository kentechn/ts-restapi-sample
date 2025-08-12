// ドメインエンティティの型定義
export interface User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface UserCreateInput {
  readonly username: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
}

export interface UserUpdateInput {
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
}

export interface UserListQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
}

export interface LoginCredentials {
  readonly username: string;
  readonly password: string;
}

export interface AuthToken {
  readonly token: string;
  readonly expiresAt: Date;
}

export interface PasswordChangeInput {
  readonly currentPassword: string;
  readonly newPassword: string;
}
