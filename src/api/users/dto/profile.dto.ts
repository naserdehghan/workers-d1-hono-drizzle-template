import { UserModel } from "./user.dto";
import { z } from "zod";

export const ProfileResponseSuccess = z.object({
  user: UserModel.omit({ password: true }),
});
