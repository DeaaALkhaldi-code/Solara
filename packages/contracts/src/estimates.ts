import { z } from "zod";
import { dateTimeSchema, idSchema, quantitySchema } from "./common.js";

export const calculatorInputSchema = z.object({
  appliances: z.array(z.object({
    name: z.string().trim().min(1).max(120),
    powerWatts: z.number().positive().max(100000),
    quantity: quantitySchema,
    hoursPerDay: z.number().min(0).max(24),
  }).strict()).min(1).max(100),
  sunHoursPerDay: z.number().positive().max(24),
  autonomyDays: z.number().min(0).max(7),
  systemVoltage: z.union([z.literal(12), z.literal(24), z.literal(48)]),
  efficiency: z.number().positive().max(1),
  usableBatteryFraction: z.number().positive().max(1),
}).strict();
export const calculatorResultSchema = z.object({
  dailyEnergyWh: z.number().nonnegative(),
  peakLoadWatts: z.number().nonnegative(),
  requiredPanelWatts: z.number().nonnegative(),
  requiredBatteryWh: z.number().nonnegative(),
}).strict();
export const recommendedProductSchema = z.object({ productId: idSchema, quantity: quantitySchema }).strict();
export const estimateSchema = z.object({
  id: idSchema,
  userId: idSchema,
  inputs: calculatorInputSchema,
  assumptions: z.record(z.string(), z.unknown()),
  calculationVersion: z.string().min(1).max(50),
  results: calculatorResultSchema,
  recommendedProducts: z.array(recommendedProductSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
}).strict();
export type CalculatorInput = z.infer<typeof calculatorInputSchema>;
export type CalculatorResult = z.infer<typeof calculatorResultSchema>;
export type Estimate = z.infer<typeof estimateSchema>;
