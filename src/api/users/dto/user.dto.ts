import { z } from "zod";

export const UserModel = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.optional(z.string()),
  last_name: z.optional(z.string()),
  created_at: z.optional(z.string()).optional(),
});
