import { z } from "zod";
import { prisma } from "../../../db.js";

export const ListEntity = z.object({
  list: z.object({ id: z.number().int() }),
  pokemon: z.nullable(z.object({ id: z.number().int() })).optional(),
  forms: z.object({ id: z.number().int() }).array().optional(),
  pokemonGender: z.nullable(z.boolean()),
  formGender: z.nullable(z.boolean()),
});

export const ListEntityDB = ListEntity.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
});

export const updateListEntity = ListEntity.partial();

export type ListEntity = z.infer<typeof ListEntity>;
export type ListEntityDB = z.infer<typeof ListEntityDB>;
export type updateListEntity = z.infer<typeof updateListEntity>;
export const ListEntities = prisma.listEntity;
