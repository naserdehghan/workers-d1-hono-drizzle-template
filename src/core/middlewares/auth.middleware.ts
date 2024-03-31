import { Context, Next } from "hono";
import { decode, verify } from "hono/jwt";
import { Bindings } from "../configs/workers";

export const auth = async (
  ctx: Context<{ Bindings: Bindings }>,
  next: Next
) => {
  const authorization = ctx.req.header("Authorization");
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return ctx.json({ message: "Unauthorized" }, 401);
  }

  const isValid = await verify(token, ctx.env.JWT_SECRET);

  if (!isValid) {
    return ctx.json({ message: "Unauthorized" }, 401);
  }

  const { payload } = decode(token);
  ctx.set("jwtPayload", payload);
  await next();
};
