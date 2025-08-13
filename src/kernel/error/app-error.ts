import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
  constructor(
    private readonly detail: string,
    public statusCode: ContentfulStatusCode = 500,
    private readonly code?: string,
    private readonly errors?: unknown,
    public stack?: string
  ) {
    super(detail);
    this.name = "AppError";
  }

  toLogObj() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      code: this.code,
      detail: this.detail,
      errors: this.errors,
      stack: this.stack,
      timestamp: new Date().toISOString(),
    };
  }
  toResponseObj() {
    return {
      code: this.code,
      detail: this.detail,
      errors: this.errors,
    };
  }
}

// ファクトリー関数
export const createError = {
  badRequest: (
    detail: string,
    code: string = "BAD_REQUEST",
    errors?: unknown,
    stack?: string
  ) => new AppError(detail, 400, code, errors, stack),

  unauthorized: (
    detail: string = "認証が必要です",
    code: string = "UNAUTHORIZED",
    stack?: string
  ) => new AppError(detail, 401, code, undefined, stack),

  forbidden: (
    detail: string = "アクセスが拒否されました",
    code: string = "FORBIDDEN",
    stack?: string
  ) => new AppError(detail, 403, code, undefined, stack),

  notFound: (
    detail: string = "リソースが見つかりません",
    code: string = "NOT_FOUND",
    stack?: string
  ) => new AppError(detail, 404, code, undefined, stack),

  conflict: (detail: string, code: string = "CONFLICT", stack?: string) =>
    new AppError(detail, 409, code, undefined, stack),

  rangeNotSatisfiable: (
    detail: string = "指定された範囲は無効です",
    code: string = "RANGE_NOT_SATISFIABLE",
    stack?: string
  ) => new AppError(detail, 416, code, undefined, stack),

  validationError: (
    detail: string = "入力値が無効です",
    code: string = "VALIDATION_ERROR",
    errors?: unknown,
    stack?: string
  ) => new AppError(detail, 422, code, errors, stack),

  internal: (
    detail: string = "内部サーバーエラーが発生しました",
    code: string = "INTERNAL_SERVER_ERROR",
    stack?: string
  ) => new AppError(detail, 500, code, undefined, stack),

  serviceUnavailable: (
    detail: string = "サービスが一時的に利用できません",
    code: string = "SERVICE_UNAVAILABLE",
    stack?: string
  ) => new AppError(detail, 503, code, undefined, stack),

  unknown: (
    detail: string = "不明なエラーが発生しました",
    code: string = "UNKNOWN_ERROR",
    stack?: string
  ) => new AppError(detail, 500, code, undefined, stack),
};
