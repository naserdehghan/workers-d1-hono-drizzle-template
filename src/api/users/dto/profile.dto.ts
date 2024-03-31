import { z } from "zod";
import { UserModel } from "./user.dto";

export const ProfileResponseSuccess = z.object({
  user: UserModel.omit({ password: true }),
});
