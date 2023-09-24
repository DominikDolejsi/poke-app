import { z } from "zod";
import { prisma } from "../../../db.js";

export const List = z.object({
  name: z.string().min(1),
  description: z.string().min(1).nullable(),
  user: z.object({ id: z.string().uuid() }),
});

export const ListDB = List.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  entities: z.object({ id: z.number().int() }).array().optional(),
});

export const updateList = List.partial();

export type List = z.infer<typeof List>;
export type ListDB = z.infer<typeof ListDB>;
export type updateList = z.infer<typeof updateList>;
export const Lists = prisma.list;
