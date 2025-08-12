import type {
  User,
  UserCreateInput,
  UserListQuery,
  UserUpdateInput,
} from "./types.js";

// ユーザーリポジトリのインターフェース
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findMany(query: UserListQuery): Promise<{ users: User[]; total: number }>;
  create(input: UserCreateInput): Promise<User>;
  update(id: string, input: UserUpdateInput): Promise<User>;
  delete(id: string): Promise<void>;
  findByCredentials(username: string, password: string): Promise<User | null>;
}

// 認証サービスのインターフェース
export interface AuthService {
  generateToken(user: User): Promise<string>;
  verifyToken(token: string): Promise<User | null>;
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
}

// ユーザーサービスのインターフェース
export interface UserService {
  getUser(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUsers(query: UserListQuery): Promise<{ users: User[]; total: number }>;
  createUser(input: UserCreateInput): Promise<User>;
  updateUser(id: string, input: UserUpdateInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void>;
}

// 認証ユースケースのインターフェース
export interface AuthUseCase {
  login(
    username: string,
    password: string,
  ): Promise<{ user: User; token: string }>;
  logout(token: string): Promise<void>;
  getCurrentUser(token: string): Promise<User>;
}
