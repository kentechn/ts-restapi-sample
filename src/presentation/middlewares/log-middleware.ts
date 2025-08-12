import { createMiddleware } from "hono/factory";
import type { ENV } from "@/app.js";
import { customLogger } from "@/utils/logger.js";

export const logMiddleware = createMiddleware<ENV>(async (c, next) => {
  const startTime = Date.now();

  // requestログの出力
  const requestId = c.get("requestId");

  // クライアントIPの取得
  const ip =
    c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ||
    c.req.header("X-Real-IP") ||
    c.req.header("CF-Connecting-IP") ||
    "unknown";
  customLogger.info({
    name: "RequestLog",
    requestId,
    method: c.req.method,
    url: c.req.url,
    path: c.req.path,
    host: c.req.header("host"),
    userAgent: c.req.header("User-Agent"),
    accept: c.req.header("accept"),
    ip,
  });

  try {
    await next();
  } finally {
    // エラーが発生してもレスポンスログを出力
    const duration = Date.now() - startTime;

    customLogger.info({
      name: "ResponseLog",
      requestId,
      method: c.req.method,
      path: c.req.path,
      statusCode: c.res.status,
      duration: `${duration}ms`,
    });
  }
});
