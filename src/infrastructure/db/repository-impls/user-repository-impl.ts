import type { UserRepository } from "@/kernel/users/user-repository.js";

export const userRepositoryImpl: UserRepository = {
  findAll: async (params) => {
    // データベースからユーザーを取得するロジックを実装
    console.log("Finding users with params:", params);

    return {
      users: [],
      totalCount: 0,
    };
  },
};
