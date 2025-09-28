import { z } from "zod";

export const createPurchaseSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  paymentMethod: z.enum(["card", "wallet", "bank_transfer"]),
  paymentDetails: z.any(),
});
