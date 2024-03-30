import { z } from "@hono/zod-openapi";

export const SignupBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignupResponseSuccess = z.object({
  id: z.string(),
});

export const SignupResponseBadRequest = z.object({
  message: z.string().openapi({ examples: ["Invalid credentials"] }),
});
