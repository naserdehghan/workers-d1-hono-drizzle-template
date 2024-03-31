import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const users = sqliteTable("users", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => uuid()),
  firstName: text("fist_name"),
  lastName: text("last_name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: int("created_at", { mode: "timestamp" }).$default(
    () => new Date()
  ),
});