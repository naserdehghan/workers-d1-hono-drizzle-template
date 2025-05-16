import type { Config } from "drizzle-kit";

export default {
  driver: "d1-http",
  schema: "./src/models/*",
  out: "./migrations",
  dialect:'sqlite',
} satisfies Config;
