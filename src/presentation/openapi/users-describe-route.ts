import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";
import { getAllUsersResponse } from "../generated/schemas/users.js";

// BaseError schema for error responses
const baseErrorSchema = z.object({
  code: z.string().describe("Machine-readable error code"),
  detail: z.string().describe("Human-readable error details"),
});

export const getUsersDescribeRoute = describeRoute({
  description:
    "Get all users with pagination. Only accessible by administrators.",
  summary: "Get all users (Admin only)",
  tags: ["users"],
  security: [],
  responses: {
    200: {
      description: "List of users with pagination metadata",
      content: {
        "application/json": {
          schema: resolver(getAllUsersResponse),
        },
      },
    },
    401: {
      description: "Unauthorized access",
      content: {
        "application/json": {
          schema: resolver(baseErrorSchema),
          example: {
            code: "UNAUTHORIZED",
            detail: "認証が必要です",
          },
        },
      },
    },
    403: {
      description: "Forbidden access",
      content: {
        "application/json": {
          schema: resolver(baseErrorSchema),
          example: {
            code: "FORBIDDEN",
            detail: "このリソースへのアクセス権限がありません",
          },
        },
      },
    },
    429: {
      description: "Rate limit exceeded",
      content: {
        "application/json": {
          schema: resolver(baseErrorSchema),
          example: {
            code: "TOO_MANY_REQUESTS",
            detail:
              "リクエスト回数の上限に達しました。しばらく待ってから再試行してください",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: resolver(baseErrorSchema),
          example: {
            code: "INTERNAL_SERVER_ERROR",
            detail: "予期しないサーバーエラーが発生しました",
          },
        },
      },
    },
  },
});
