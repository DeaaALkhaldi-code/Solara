import { sql } from "drizzle-orm";
import { boolean, char, check, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { orderStatuses, ticketStatuses, userRoles } from "@solara/contracts";

export const userRole = pgEnum("user_role", userRoles);
export const orderStatus = pgEnum("order_status", orderStatuses);
export const ticketStatus = pgEnum("ticket_status", ticketStatuses);

const timestamps = () => ({
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  role: userRole("role").notNull().default("customer"),
  passwordHash: text("password_hash"),
  ...timestamps(),
}, (table) => [
  uniqueIndex("users_email_unique").on(table.email),
  check("users_email_normalized", sql`${table.email} = lower(trim(${table.email}))`),
]);

// Storage foundation only. Session issuance, hashing, cookies, and authentication are not implemented.
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("sessions_token_hash_unique").on(table.tokenHash),
  index("sessions_user_expiry_idx").on(table.userId, table.expiresAt),
  check("sessions_expiry_after_creation", sql`${table.expiresAt} > ${table.createdAt}`),
]);

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull(),
  description: text("description"),
  ...timestamps(),
}, (table) => [uniqueIndex("categories_slug_unique").on(table.slug)]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "restrict" }),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 220 }).notNull(),
  description: text("description").notNull(),
  imageUrls: jsonb("image_urls").$type<string[]>().notNull().default([]),
  specifications: jsonb("specifications").$type<Record<string, unknown>>().notNull().default({}),
  priceMinor: integer("price_minor").notNull(),
  currency: char("currency", { length: 3 }).notNull(),
  stockQuantity: integer("stock_quantity").notNull().default(0),
  available: boolean("available").notNull().default(true),
  ...timestamps(),
}, (table) => [
  uniqueIndex("products_slug_unique").on(table.slug),
  index("products_category_available_idx").on(table.categoryId, table.available),
  check("products_price_nonnegative", sql`${table.priceMinor} >= 0`),
  check("products_stock_nonnegative", sql`${table.stockQuantity} >= 0`),
  check("products_currency_format", sql`${table.currency} ~ '^[A-Z]{3}$'`),
]);

export const estimates = pgTable("estimates", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  inputs: jsonb("inputs").$type<Record<string, unknown>>().notNull(),
  assumptions: jsonb("assumptions").$type<Record<string, unknown>>().notNull(),
  calculationVersion: varchar("calculation_version", { length: 50 }).notNull(),
  results: jsonb("results").$type<Record<string, unknown>>().notNull(),
  ...timestamps(),
}, (table) => [index("estimates_user_created_idx").on(table.userId, table.createdAt)]);

export const estimateProducts = pgTable("estimate_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  estimateId: uuid("estimate_id").notNull().references(() => estimates.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  quantity: integer("quantity").notNull(),
}, (table) => [
  uniqueIndex("estimate_products_pair_unique").on(table.estimateId, table.productId),
  index("estimate_products_product_idx").on(table.productId),
  check("estimate_products_quantity_positive", sql`${table.quantity} > 0`),
]);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  status: orderStatus("status").notNull().default("pending"),
  trackingReference: varchar("tracking_reference", { length: 80 }),
  totalMinor: integer("total_minor").notNull(),
  currency: char("currency", { length: 3 }).notNull(),
  contactName: varchar("contact_name", { length: 120 }).notNull(),
  contactEmail: varchar("contact_email", { length: 254 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 30 }).notNull(),
  deliveryAddress: jsonb("delivery_address").$type<Record<string, unknown>>().notNull(),
  ...timestamps(),
}, (table) => [
  uniqueIndex("orders_tracking_reference_unique").on(table.trackingReference),
  index("orders_user_created_idx").on(table.userId, table.createdAt),
  index("orders_status_created_idx").on(table.status, table.createdAt),
  check("orders_total_nonnegative", sql`${table.totalMinor} >= 0`),
  check("orders_currency_format", sql`${table.currency} ~ '^[A-Z]{3}$'`),
]);

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  productName: varchar("product_name", { length: 200 }).notNull(),
  unitPriceMinor: integer("unit_price_minor").notNull(),
  quantity: integer("quantity").notNull(),
}, (table) => [
  index("order_items_order_idx").on(table.orderId),
  index("order_items_product_idx").on(table.productId),
  check("order_items_price_nonnegative", sql`${table.unitPriceMinor} >= 0`),
  check("order_items_quantity_positive", sql`${table.quantity} > 0`),
]);

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "restrict" }),
  productId: uuid("product_id").references(() => products.id, { onDelete: "restrict" }),
  issueCategory: varchar("issue_category", { length: 80 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  description: text("description").notNull(),
  status: ticketStatus("status").notNull().default("open"),
  ...timestamps(),
}, (table) => [
  index("tickets_user_created_idx").on(table.userId, table.createdAt),
  index("tickets_status_updated_idx").on(table.status, table.updatedAt),
  index("tickets_order_idx").on(table.orderId),
  index("tickets_product_idx").on(table.productId),
]);

export const ticketReplies = pgTable("ticket_replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  ticketId: uuid("ticket_id").notNull().references(() => tickets.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("ticket_replies_ticket_created_idx").on(table.ticketId, table.createdAt), index("ticket_replies_author_idx").on(table.authorId)]);

export const ticketNotes = pgTable("ticket_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  ticketId: uuid("ticket_id").notNull().references(() => tickets.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("ticket_notes_ticket_created_idx").on(table.ticketId, table.createdAt), index("ticket_notes_author_idx").on(table.authorId)]);
