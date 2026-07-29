import type { Knex } from "knex";
import { DB_SCHEMA } from "../src/db-schema.js";

export async function up(knex: Knex) {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS ??`, [DB_SCHEMA]);
}

export async function down(knex: Knex) {
  await knex.raw(`DROP SCHEMA IF EXISTS ?? CASCADE`, [DB_SCHEMA]);
}
