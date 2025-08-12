import { Hono } from "hono";

import { describeRoute } from "hono-openapi";
// You can import these for your preferred validation library
import { resolver, validator as vValidator } from "hono-openapi/zod";

const usersRoute = new Hono();
