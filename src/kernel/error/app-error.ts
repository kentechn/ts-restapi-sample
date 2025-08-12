import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
  constructor(
    private readonly detail: string,
    public statusCode: ContentfulStatusCode = 500,
    private readonly code?: string,
    private readonly errors?: unknown
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
  badRequest: (detail: string, code?: string, errors?: unknown) =>
    new AppError(detail, 400, code, errors),

  unauthorized: (
    detail: string = "認証が必要です",
    code: string = "UNAUTHORIZED"
  ) => new AppError(detail, 401, code),

  forbidden: (
    detail: string = "アクセスが拒否されました",
    code: string = "FORBIDDEN"
  ) => new AppError(detail, 403, code),

  notFound: (
    detail: string = "リソースが見つかりません",
    code: string = "NOT_FOUND"
  ) => new AppError(detail, 404, code),

  conflict: (detail: string, code: string = "CONFLICT") =>
    new AppError(detail, 409, code),

  rangeNotSatisfiable: (
    detail: string = "指定された範囲は無効です",
    code: string = "RANGE_NOT_SATISFIABLE",
    errors?: unknown
  ) => new AppError(detail, 416, code, errors),

  internal: (
    detail: string = "内部サーバーエラーが発生しました",
    code: string = "INTERNAL_SERVER_ERROR"
  ) => new AppError(detail, 500, code),

  serviceUnavailable: (
    detail: string = "サービスが一時的に利用できません",
    code: string = "SERVICE_UNAVAILABLE"
  ) => new AppError(detail, 503, code),

  unknown: (
    detail: string = "不明なエラーが発生しました",
    code: string = "UNKNOWN_ERROR"
  ) => new AppError(detail, 500, code),
};
