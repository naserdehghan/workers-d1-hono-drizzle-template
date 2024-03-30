import { createRoute } from "@hono/zod-openapi";
import { ProfileResponseSuccess } from "../dto";

export const ProfileOpenAPI = createRoute({
  method: "get",
  tags: ["Users"],
  operationId: "profile",
  summary: "Profile",
  path: "/",
  security: [{ Bearer: [] }],
  responses: {
    200: {
      description: "Success",
      content: { "application/json": { schema: ProfileResponseSuccess } },
    },
  },
});
