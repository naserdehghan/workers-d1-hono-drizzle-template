import type { Config } from "drizzle-kit";

export default {
  driver: "d1",
  schema: "./src/models/*",
  out: "./migrations",
} satisfies Config;
