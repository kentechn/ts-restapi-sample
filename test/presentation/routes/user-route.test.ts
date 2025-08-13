import { describe, expect, it } from "vitest";
import app from "@/app.js";

describe("User Route", () => {
  describe("GET /api/v1/users", () => {
    describe("200 成功ケース", () => {
      it("正常なクエリパラメータでユーザー一覧を返すこと", async () => {
        const res = await app.request("/api/v1/users?offset=0&limit=10");

        expect(res.status).toBe(200);

        const json = await res.json();
        expect(json).toHaveProperty("data");
        expect(json).toHaveProperty("meta");
        expect(Array.isArray(json.data)).toBe(true);
        expect(json.meta).toHaveProperty("pagination");
        expect(json.meta.pagination).toHaveProperty("offset");
        expect(json.meta.pagination).toHaveProperty("limit");
        expect(json.meta.pagination).toHaveProperty("total");
      });

      it("クエリパラメータを省略した場合、デフォルト値でユーザー一覧を返すこと", async () => {
        const res = await app.request("/api/v1/users");

        expect(res.status).toBe(200);

        const json = await res.json();
        expect(json).toHaveProperty("data");
        expect(json).toHaveProperty("meta");
        expect(Array.isArray(json.data)).toBe(true);
        // デフォルト値の確認
        expect(json.meta.pagination.offset).toBe(0);
        expect(json.meta.pagination.limit).toBe(10);
      });

      it("offsetのみ指定した場合、正常にユーザー一覧を返すこと", async () => {
        const res = await app.request("/api/v1/users?offset=5");

        expect(res.status).toBe(200);

        const json = await res.json();
        expect(json).toHaveProperty("data");
        expect(json).toHaveProperty("meta");
        expect(json.meta.pagination.offset).toBe(5);
        expect(json.meta.pagination.limit).toBe(10); // デフォルト値
      });

      it("limitのみ指定した場合、正常にユーザー一覧を返すこと", async () => {
        const res = await app.request("/api/v1/users?limit=5");

        expect(res.status).toBe(200);

        const json = await res.json();
        expect(json).toHaveProperty("data");
        expect(json).toHaveProperty("meta");
        expect(json.meta.pagination.offset).toBe(0); // デフォルト値
        expect(json.meta.pagination.limit).toBe(5);
      });
    });

    describe("422 バリデーションエラーケース", () => {
      it("offsetが負の値の場合、422エラーを返すこと", async () => {
        const res = await app.request("/api/v1/users?offset=-1");

        expect(res.status).toBe(422);

        const json = await res.json();
        expect(json).toHaveProperty("code");
        expect(json).toHaveProperty("detail");
        expect(json).toHaveProperty("errors");
        expect(json.code).toBe("VALIDATION_ERROR");
        expect(json.detail).toBe("入力値が無効です");
        expect(Array.isArray(json.errors)).toBe(true);
      });

      it("limitが0の場合、422エラーを返すこと", async () => {
        const res = await app.request("/api/v1/users?limit=0");

        expect(res.status).toBe(422);

        const json = await res.json();
        expect(json).toHaveProperty("code");
        expect(json).toHaveProperty("detail");
        expect(json).toHaveProperty("errors");
        expect(json.code).toBe("VALIDATION_ERROR");
        expect(json.detail).toBe("入力値が無効です");
        expect(Array.isArray(json.errors)).toBe(true);
      });

      it("limitが最大値を超える場合、422エラーを返すこと", async () => {
        const res = await app.request("/api/v1/users?limit=101");

        expect(res.status).toBe(422);

        const json = await res.json();
        expect(json).toHaveProperty("code");
        expect(json).toHaveProperty("detail");
        expect(json).toHaveProperty("errors");
        expect(json.code).toBe("VALIDATION_ERROR");
        expect(json.detail).toBe("入力値が無効です");
        expect(Array.isArray(json.errors)).toBe(true);
      });

      it("offsetが数値でない場合、422エラーを返すこと", async () => {
        const res = await app.request("/api/v1/users?offset=invalid");

        expect(res.status).toBe(422);

        const json = await res.json();
        expect(json).toHaveProperty("code");
        expect(json).toHaveProperty("detail");
        expect(json).toHaveProperty("errors");
        expect(json.code).toBe("VALIDATION_ERROR");
        expect(json.detail).toBe("入力値が無効です");
        expect(Array.isArray(json.errors)).toBe(true);
      });

      it("limitが数値でない場合、422エラーを返すこと", async () => {
        const res = await app.request("/api/v1/users?limit=invalid");

        expect(res.status).toBe(422);

        const json = await res.json();
        expect(json).toHaveProperty("code");
        expect(json).toHaveProperty("detail");
        expect(json).toHaveProperty("errors");
        expect(json.code).toBe("VALIDATION_ERROR");
        expect(json.detail).toBe("入力値が無効です");
        expect(Array.isArray(json.errors)).toBe(true);
      });

      it("複数のバリデーションエラーが発生する場合、422エラーを返すこと", async () => {
        const res = await app.request("/api/v1/users?offset=-5&limit=200");

        expect(res.status).toBe(422);

        const json = await res.json();
        expect(json).toHaveProperty("code");
        expect(json).toHaveProperty("detail");
        expect(json).toHaveProperty("errors");
        expect(json.code).toBe("VALIDATION_ERROR");
        expect(json.detail).toBe("入力値が無効です");
        expect(Array.isArray(json.errors)).toBe(true);
        expect(json.errors.length).toBeGreaterThan(1);
      });
    });
  });
});
