import { config } from "dotenv";
import type { Knex } from "knex";
import { DB_SCHEMA } from "./src/db-schema.js";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
config({ path: `.env.${mode}` });
config();

if (!process.env.DATABASE_URL && process.env.DB_HOST) {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
  process.env.DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

const connection = process.env.DATABASE_URL;
if (!connection) throw new Error("DATABASE_URL is required");

const shared: Knex.Config = {
  client: "pg",
  connection,
  searchPath: [DB_SCHEMA, "public"],
  pool: { min: 0, max: 10 },
  // Keep migration history in public even when searchPath prefers the app schema.
  // Otherwise Knex creates an empty the_plugin.knex_migrations and re-runs all migrations.
  migrations: {
    directory: "./migrations",
    extension: "ts",
    schemaName: "public",
    tableName: "knex_migrations",
  },
};

export default {
  development: shared,
  production: { ...shared, pool: { min: 0, max: 5 } },
} satisfies Record<string, Knex.Config>;
