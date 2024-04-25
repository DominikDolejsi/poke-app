import { z } from "zod";
import { prisma } from "../../../db.js";

export const game = z.object({
  name: z.string().min(1),
  pokemon: z.object({ id: z.number().int() }).array().optional(),
  forms: z.object({ id: z.number().int() }).array().optional(),
});

export const gameDB = game.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
});

export const updateGame = game.partial();

export type Game = z.infer<typeof game>;
export type GameDB = z.infer<typeof gameDB>;
export type UpdateGame = z.infer<typeof updateGame>;
export const Games = prisma.game;
