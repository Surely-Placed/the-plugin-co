import type { Knex } from "knex";
import { DB_SCHEMA } from "../src/db-schema.js";

const APP_TABLES = [
  "plans",
  "idempotency_keys",
  "customers",
  "orders",
  "payments",
  "payment_events",
] as const;

async function existsInSchema(knex: Knex, schema: string, table: string) {
  const row = await knex("information_schema.tables")
    .where({ table_schema: schema, table_name: table })
    .first();
  return Boolean(row);
}

export async function up(knex: Knex) {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS ??`, [DB_SCHEMA]);

  for (const table of APP_TABLES) {
    const inPublic = await existsInSchema(knex, "public", table);
    const inApp = await existsInSchema(knex, DB_SCHEMA, table);
    if (inPublic && !inApp) {
      await knex.raw(`ALTER TABLE public.?? SET SCHEMA ??`, [table, DB_SCHEMA]);
    }
  }
}

export async function down(knex: Knex) {
  for (const table of [...APP_TABLES].reverse()) {
    const inApp = await existsInSchema(knex, DB_SCHEMA, table);
    const inPublic = await existsInSchema(knex, "public", table);
    if (inApp && !inPublic) {
      await knex.raw(`ALTER TABLE ??.?? SET SCHEMA public`, [DB_SCHEMA, table]);
    }
  }
}
