import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex("plans").update({ currency: "EUR" });
}

export async function down(knex: Knex) {
  await knex("plans").update({ currency: "INR" });
}
