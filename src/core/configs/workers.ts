import { DrizzleD1Database } from "drizzle-orm/d1";

export type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
};

export type Variables = {
  db: DrizzleD1Database<Record<string, never>>;
  jwtPayload?: { id: string };
};
