import { z } from "@hono/zod-openapi";

export const SigninBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SigninResponseSuccess = z.object({
  token: z.string(),
});

export const SigninResponseBadRequest = z.object({
  message: z.string().openapi({ examples: ["Email already in use"] }),
});
