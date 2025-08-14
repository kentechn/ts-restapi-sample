import { Hono } from "hono";
import { validator as zValidator } from "hono-openapi/zod";
import { getUsersUsecase } from "@/kernel/users/usecases/index.js";
import type { UserListItem } from "../generated/types/userListItem.js";
import { getUsersDescribeRoute } from "../openapi/users-describe-route.js";
import { getAllUsersQueryParamsWithCoerce } from "../schemas/users-coerce.js";

const usersRoute = new Hono();

usersRoute.get(
  "/",
  getUsersDescribeRoute,
  zValidator("query", getAllUsersQueryParamsWithCoerce, (result, _c) => {
    if (!result.success) {
      throw result.error;
    }
  }),
  async (c) => {
    const query = c.req.valid("query");
    console.log("Query parameters:", query);

    // UseCase を実行
    const result = await getUsersUsecase.execute({
      offset: query.offset,
      limit: query.limit,
    });

    // UseCase の結果を API レスポンス形式に変換
    const users: UserListItem[] = result.users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return c.json({
      data: users,
      meta: {
        pagination: {
          offset: query.offset,
          limit: query.limit,
          total: result.totalCount,
        },
      },
    });
  }
);

export default usersRoute;
