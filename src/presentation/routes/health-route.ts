import { Hono } from "hono";
import { healthDescribeRoute } from "../openapi/health-describe-route.js";

const healthRoute = new Hono();

healthRoute.get("/", healthDescribeRoute, async (c) => {
  return c.json({
    status: "ok",
  });
});

export default healthRoute;
