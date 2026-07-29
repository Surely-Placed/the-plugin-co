import knex from "knex";
import { DB_SCHEMA } from "./db-schema.js";
import { env } from "./env.js";

export const db = knex({
  client: "pg",
  connection: env.DATABASE_URL,
  searchPath: [DB_SCHEMA, "public"],
  pool: { min: 0, max: 5 },
});

export async function verifyDbConnection() {
  await db.raw("select 1");
  console.log("database connection successful");
}
