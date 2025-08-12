import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import type { RequestIdVariables } from "hono/request-id";
import { requestId } from "hono/request-id";
import { openAPISpecs } from "hono-openapi";
import { logMiddleware } from "@/presentation/middlewares/log-middleware.js";
import healthRoute from "@/presentation/routes/health-route.js";
import { AppError, createError } from "./kernel/error/app-error.js";
import { customLogger } from "./utils/logger.js";

const API_VERSION = "v1";

export type ENV = {
  Variables: {
    requestId: RequestIdVariables;
  };
};

const app = new Hono<ENV>().basePath(`/api/${API_VERSION}`);

app.use("*", requestId());
app.use("*", logMiddleware);

// エラーハンドリング
app.onError((err, c) => {
  const requestId = c.get("requestId");

  if (err instanceof AppError) {
    customLogger.error({
      requestId,
      ...err.toLogObj(),
    });
    return c.json(err.toResponseObj(), err.statusCode);
  }

  const unknownError = createError.unknown();
  customLogger.error({
    requestId,
    ...unknownError.toLogObj(),
  });

  // エラーレスポンス
  return c.json(unknownError.toResponseObj(), unknownError.statusCode);
});

app.route("/health", healthRoute);

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "ts restapi sample",
        version: "1.0.0",
        description: "ts restapi sample",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [
        {
          url: `http://localhost:3000`,
          description: "Local Server",
        },
        {
          url: `https://api.example.com`,
          description: "Production server",
        },
      ],
    },
  })
);

app.get(
  "/docs",
  swaggerUI({
    url: `/api/${API_VERSION}/openapi`,
  })
);

export default app;
