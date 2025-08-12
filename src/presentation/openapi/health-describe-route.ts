import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { healthCheckResponse } from "../generated/schemas/health.js";

export const healthDescribeRoute = describeRoute({
  description: "Health check endpoint",
  tags: ["health"],
  // parameters: [
  //   {
  //     name: "name",
  //     in: "query",
  //     required: true,
  //     description: "名前",
  //     schema: {
  //       type: "string",
  //       description: "Please enter your name.",
  //       example: "John Doe",
  //       minLength: 1,
  //     },
  //   },
  //   {
  //     name: "name2",
  //     in: "query",
  //     required: true,
  //     description: "名前2",
  //     schema: {
  //       type: "string",
  //       description: "Please enter your name2.",
  //       example: "Jane Doe",
  //       minLength: 1,
  //     },
  //   },
  // ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: resolver(healthCheckResponse),
        },
      },
    },
  },
  validateResponse: true,
});
