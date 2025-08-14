import { userRepositoryImpl } from "@/infrastructure/db/repository-impls/user-repository-impl.js";
import { GetUsersUsecase } from "./get-users-usecase.js";

export const getUsersUsecase = new GetUsersUsecase(userRepositoryImpl);
