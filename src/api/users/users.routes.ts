import { OpenAPIHono } from "@hono/zod-openapi";
import { Bindings, Variables } from "../../core/configs/workers";
import { auth } from "../../core/middlewares/auth.middleware";
import { ProfileOpenAPI, SigninOpenAPI, SignupOpenAPI } from "./openapi";
import { UsersService } from "./users.service";

const routes = new OpenAPIHono<{
  Bindings: Bindings;
  Variables: Variables & { usersService: UsersService };
}>();

routes.use(async (ctx, next) => {
  const usersService = UsersService.getInstance(ctx.var.db, ctx.env.JWT_SECRET);
  ctx.set("usersService", usersService);
  await next();
});

//#region Sign up
routes.openapi(SignupOpenAPI, async (ctx) => {
  const { email, password } = ctx.req.valid("json");

  const userExists = await ctx.var.usersService.emailExists(email);

  if (userExists) {
    return ctx.json({ message: "Email already in use" }, 400);
  }

  const id = await ctx.var.usersService.signUp({ email, password });
  return ctx.json({ id });
});
//#endregion
//#region Sign in
routes.openapi(SigninOpenAPI, async (ctx) => {
  const { email, password } = ctx.req.valid("json");

  try {
    const { token } = await ctx.var.usersService.signIn({
      email,
      password,
    });

    return ctx.json({ token });
  } catch (err: any) {
    return ctx.json({ message: err.message }, 400);
  }
});
//#endregion
//#region Profile
routes.use(ProfileOpenAPI.getRoutingPath(), auth);
routes.openapi(ProfileOpenAPI, async (ctx) => {
  const userId = ctx.var.jwtPayload.id!;
  const user = await ctx.var.usersService.profile(userId);

  return ctx.json({
    user: {
      ...user,
      created_at: !!user.created_at ? user.created_at : undefined,
    },
  });
});
//#endregion

export { routes as UsersRoutes };
