import type { Knex } from "knex";

const PLANS = [
  { slug: "growth-foundation", division: "growth", name: "Foundation", amount_minor: 150000, currency: "GBP" },
  { slug: "growth-solution", division: "growth", name: "Solution", amount_minor: 350000, currency: "GBP" },
  { slug: "growth-full-stack", division: "growth", name: "Full Stack", amount_minor: 650000, currency: "GBP" },
  { slug: "talent-starter", division: "careers", name: "Starter", amount_minor: 34900, currency: "GBP" },
  { slug: "talent-accelerator", division: "careers", name: "Accelerator", amount_minor: 74900, currency: "GBP" },
  { slug: "talent-elite", division: "careers", name: "Elite", amount_minor: 129900, currency: "GBP" },
];

export async function up(knex: Knex) {
  await knex.schema.createTable("plans", (t) => {
    t.string("slug").primary();
    t.string("division").notNullable();
    t.string("name").notNullable();
    t.integer("amount_minor").notNullable();
    t.string("currency", 3).notNullable().defaultTo("GBP");
    t.boolean("active").notNullable().defaultTo(true);
  });

  await knex.schema.createTable("idempotency_keys", (t) => {
    t.string("key").primary();
    t.string("scope").notNullable();
    t.integer("status_code").notNullable();
    t.jsonb("body").notNullable();
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.index(["scope", "created_at"]);
  });

  await knex.schema.createTable("customers", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    t.string("name").notNullable();
    t.string("email").notNullable();
    t.string("phone");
    t.timestamps(true, true);
  });

  await knex.schema.createTable("orders", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("customer_id").notNullable().references("id").inTable("customers");
    t.string("plan_slug").notNullable().references("slug").inTable("plans");
    t.string("razorpay_order_id").unique();
    t.string("status").notNullable().defaultTo("created");
    t.integer("amount_minor").notNullable();
    t.string("currency", 3).notNullable();
    t.string("idempotency_key").unique();
    t.timestamps(true, true);
  });

  await knex.schema.createTable("payments", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("order_id").notNullable().unique().references("id").inTable("orders");
    t.string("razorpay_payment_id").unique();
    t.string("status").notNullable();
    t.timestamps(true, true);
  });

  await knex.schema.createTable("payment_events", (t) => {
    t.bigIncrements("id").primary();
    t.string("event_id").notNullable().unique();
    t.string("type").notNullable();
    t.jsonb("payload").notNullable();
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex("plans").insert(PLANS);
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists("payment_events");
  await knex.schema.dropTableIfExists("payments");
  await knex.schema.dropTableIfExists("orders");
  await knex.schema.dropTableIfExists("customers");
  await knex.schema.dropTableIfExists("idempotency_keys");
  await knex.schema.dropTableIfExists("plans");
}
