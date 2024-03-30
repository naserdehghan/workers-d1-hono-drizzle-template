import { createRoute } from "@hono/zod-openapi";
import {
  SigninBody,
  SigninResponseBadRequest,
  SigninResponseSuccess,
} from "../dto";

export const SigninOpenAPI = createRoute({
  method: "post",
  tags: ["Users"],
  operationId: "signIn",
  summary: "SignIn user",
  path: "/sign-in",
  request: {
    body: { content: { "application/json": { schema: SigninBody } } },
  },
  responses: {
    200: {
      description: "Success",
      content: { "application/json": { schema: SigninResponseSuccess } },
    },
    400: {
      description: "Bad request",
      content: { "application/json": { schema: SigninResponseBadRequest } },
    },
  },
});
