import { z } from "zod";
import { prisma } from "../../../db.js";
import { genericDBModel } from "../../../types/genericDBTypes.js";

export const list = z.object({
  name: z.string().min(1),
  description: z.string().min(1).nullable(),
  user: z.object({ id: z.string().uuid() }),
});

export const listDB = list.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  entities: genericDBModel.array().optional(),
});

export const updateList = list.partial();

export type List = z.infer<typeof list>;
export type ListDB = z.infer<typeof listDB>;
export type UpdateList = z.infer<typeof updateList>;
export const Lists = prisma.list;
