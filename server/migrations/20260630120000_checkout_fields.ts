import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.alterTable("customers", (t) => {
    t.string("website");
    t.text("service_requirement");
  });

  await knex.schema.alterTable("orders", (t) => {
    t.timestamp("confirmation_emailed_at", { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.alterTable("orders", (t) => {
    t.dropColumn("confirmation_emailed_at");
  });
  await knex.schema.alterTable("customers", (t) => {
    t.dropColumn("service_requirement");
    t.dropColumn("website");
  });
}
