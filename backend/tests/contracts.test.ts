import assert from "node:assert/strict";
import { test } from "node:test";
import { createOrderInputSchema, registerInputSchema, userSchema, ticketSchema, calculatorInputSchema } from "@solara/contracts";

test("registration rejects role escalation and normalizes email", () => {
  const input = { name: "Customer", email: "CUSTOMER@example.com", password: "long-test-password" };
  assert.equal(registerInputSchema.parse(input).email, "customer@example.com");
  assert.equal(registerInputSchema.safeParse({ ...input, role: "admin" }).success, false);
});

test("order input rejects client totals, prices, and invalid quantities", () => {
  const input = {
    items: [{ productId: "00000000-0000-4000-8000-000000000001", quantity: 2 }],
    contactName: "Customer", contactEmail: "customer@example.com", contactPhone: "123456789",
    deliveryAddress: { line1: "Example street", city: "Example city", countryCode: "PS" },
  };
  assert.equal(createOrderInputSchema.safeParse(input).success, true);
  assert.equal(createOrderInputSchema.safeParse({ ...input, totalMinor: 1 }).success, false);
  assert.equal(createOrderInputSchema.safeParse({ ...input, items: [{ ...input.items[0], unitPriceMinor: 1 }] }).success, false);
  assert.equal(createOrderInputSchema.safeParse({ ...input, items: [{ ...input.items[0], quantity: 0 }] }).success, false);
});

test("customer DTOs reject authentication secrets and internal staff notes", () => {
  const id = "00000000-0000-4000-8000-000000000001";
  const date = "2026-10-16T00:00:00Z";
  const user = { id, name: "Customer", email: "customer@example.com", phone: null, role: "customer", createdAt: date, updatedAt: date };
  assert.equal(userSchema.safeParse(user).success, true);
  assert.equal(userSchema.safeParse({ ...user, passwordHash: "private" }).success, false);
  const ticket = { id, userId: id, orderId: null, productId: null, issueCategory: "other", subject: "Issue", description: "Details", status: "open", createdAt: date, updatedAt: date };
  assert.equal(ticketSchema.safeParse(ticket).success, true);
  assert.equal(ticketSchema.safeParse({ ...ticket, internalNotes: ["private"] }).success, false);
});

test("calculator contract requires explicit bounded energy assumptions", () => {
  const input = {
    appliances: [{ name: "Light", powerWatts: 10, quantity: 2, hoursPerDay: 5 }],
    sunHoursPerDay: 5, autonomyDays: 1, systemVoltage: 48, efficiency: 0.8, usableBatteryFraction: 0.8,
  };
  assert.equal(calculatorInputSchema.safeParse(input).success, true);
  assert.equal(calculatorInputSchema.safeParse({ ...input, efficiency: 0 }).success, false);
  assert.equal(calculatorInputSchema.safeParse({ ...input, sunHoursPerDay: 25 }).success, false);
});
