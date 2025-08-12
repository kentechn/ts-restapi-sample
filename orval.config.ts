import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./docs/openapi.gen.yml",
    output: {
      target: "./src/presentation/generated/schemas",
      client: "zod",
      mode: "tags",
      schemas: "./src/presentation/generated/types",
      mock: false,
    },
    // hooks: {
    //   afterAllFilesWrite: 'prettier --write',
    // },
  },
});
