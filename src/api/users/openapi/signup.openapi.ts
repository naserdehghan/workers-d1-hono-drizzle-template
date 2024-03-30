import { createRoute } from "@hono/zod-openapi";
import {
  SignupBody,
  SignupResponseBadRequest,
  SignupResponseSuccess,
} from "../dto";

export const SignupOpenAPI = createRoute({
  method: "post",
  tags: ["Users"],
  operationId: "signUp",
  summary: "SignUp new user",
  path: "/sign-up",
  request: {
    body: { content: { "application/json": { schema: SignupBody } } },
  },
  responses: {
    200: {
      description: "Success",
      content: { "application/json": { schema: SignupResponseSuccess } },
    },
    400: {
      description: "Bad request",
      content: { "application/json": { schema: SignupResponseBadRequest } },
    },
  },
});
