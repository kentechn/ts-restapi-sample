import { Hono } from "hono";
import { healthDescribeRoute } from "../openapi/health-describe-route.js";

const healthRoute = new Hono();

healthRoute.get("/", healthDescribeRoute, (c) => {
  return c.json({
    status: "ok",
  });
});

export default healthRoute;
