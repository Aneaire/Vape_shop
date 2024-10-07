"use client";

import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(65535).optional(),
  sku: z.string().max(36),
  price: z.coerce.number(),
  nicotineStrength: z.coerce.number(),
  flavor: z.string().max(255).optional(),
  volume: z.coerce.number(),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5000000,
      `File size should be less than 5MB.`
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Only .jpg, .png, and .gif formats are supported."
    )
    .optional(),
});

export const inventorySchema = z.object({
  productId: z.string().min(1).max(36),
  quantity: z.coerce.number(),
  lowStockThreshold: z.coerce.number().optional(),
});
