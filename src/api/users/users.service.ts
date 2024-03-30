import { and, eq } from "drizzle-orm";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { sign } from "hono/jwt";
import { md5 } from "hono/utils/crypto";
import { users } from "../../models/user.model";

export class UsersService {
  private static instance: UsersService;

  constructor(
    private readonly db: DrizzleD1Database<Record<string, never>>,
    private readonly jwtSecret: string
  ) {}

  public static getInstance(
    db: DrizzleD1Database<Record<string, never>>,
    jwtSecret: string
  ) {
    if (!this.instance) this.instance = new UsersService(db, jwtSecret);
    return this.instance;
  }

  public async emailExists(email: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    return !!user;
  }

  public async signUp(data: { email: string; password: string }) {
    const { email, password } = data;

    const hashedPassword = await md5(password);

    const user = await this.db
      .insert(users)
      .values({ email, password: hashedPassword! })
      .returning({ id: users.id })
      .get();

    return user.id;
  }

  public async signIn(data: { email: string; password: string }) {
    const { email, password } = data;

    const hashedPassword = await md5(password);

    const user = await this.db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, hashedPassword!)))
      .get();

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const token = await sign({ id: user.id }, this.jwtSecret);
    return { token };
  }

  public async profile(id: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .get();

    if (!result) {
      throw new Error("User not found");
    }

    const { password, ...user } = result;

    return user;
  }
}
