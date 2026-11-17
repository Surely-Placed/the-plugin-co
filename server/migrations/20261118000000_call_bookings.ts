import type { Knex } from "knex";
import { DB_SCHEMA } from "../src/db-schema.js";

// Additive + idempotent: safe to re-run, touches nothing but call_bookings.
export function callBookingsUpSql(schema: string) {
  const t = `"${schema}"."call_bookings"`;
  return [
    `CREATE SCHEMA IF NOT EXISTS "${schema}"`,
    `CREATE TABLE IF NOT EXISTS ${t} (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  work_email text NOT NULL,
  phone text NOT NULL,
  company text NOT NULL,
  website text,
  country text NOT NULL,
  services jsonb NOT NULL DEFAULT '[]'::jsonb,
  monthly_budget text NOT NULL,
  start_timeline text NOT NULL,
  problem_statement text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text NOT NULL DEFAULT 'details_submitted',
  meeting_link text,
  meeting_start timestamptz,
  calendar_event_id text,
  sheet_synced_at timestamptz,
  sheet_sync_error text
)`,
    `CREATE INDEX IF NOT EXISTS call_bookings_work_email_idx ON ${t} (work_email)`,
    `CREATE INDEX IF NOT EXISTS call_bookings_created_at_idx ON ${t} (created_at)`,
    `CREATE INDEX IF NOT EXISTS call_bookings_status_idx ON ${t} (status)`,
  ];
}

export async function up(knex: Knex) {
  for (const sql of callBookingsUpSql(DB_SCHEMA)) await knex.raw(sql);
}

export async function down(knex: Knex) {
  await knex.raw(`DROP TABLE IF EXISTS ??.call_bookings`, [DB_SCHEMA]);
}
