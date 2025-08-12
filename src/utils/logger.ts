import type { LoggerOptions } from "pino";
import pino from "pino";

// 環境変数の取得
const NODE_ENV = process.env.NODE_ENV || "development";
const LOG_LEVEL =
  process.env.LOG_LEVEL || (NODE_ENV === "production" ? "info" : "debug");
const SERVICE_NAME = process.env.SERVICE_NAME || "ts-restapi-sample";
const SERVICE_VERSION = process.env.SERVICE_VERSION || "v1";

// 共通設定
const commonConfig: LoggerOptions = {
  level: LOG_LEVEL,
  base: {
    service: SERVICE_NAME,
    version: SERVICE_VERSION,
  },
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: [
      // 機密情報をマスキング
      "*.password",
      "*.token",
      "*.apiKey",
      "*.secret",
      "*.authorization",
      "*.cookie",
      "req.headers.authorization",
      "req.headers.cookie",
      "res.headers['set-cookie']",
    ],
    censor: "***REDACTED***",
  },
};

// 本番環境用の設定
const productionConfig: LoggerOptions = {
  ...commonConfig,
};

// 開発環境用の設定
const developmentConfig: LoggerOptions = {
  ...commonConfig,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "yyyy-mm-dd HH:MM:ss.l",
      ignore: "pid,hostname",
      messageFormat: "[{requestId}] {msg}",
      errorProps: "stack",
    },
  },
};

// テスト環境用の設定
const testConfig: LoggerOptions = {
  level: "silent", // テスト時はログを出力しない
};

// 環境に応じた設定を選択
function getLoggerConfig(): LoggerOptions {
  switch (NODE_ENV) {
    case "production":
      return productionConfig;
    case "test":
      return testConfig;
    default:
      return developmentConfig;
  }
}

// ロガーインスタンスの作成
export const customLogger = pino(getLoggerConfig());
