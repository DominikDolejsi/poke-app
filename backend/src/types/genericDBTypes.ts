import { z } from "zod";

export const genericDBModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
});