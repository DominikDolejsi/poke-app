import { z } from "zod";
import { prisma } from "../../../db.js";

export const Game = z.object({
  name: z.string().min(1),
  pokemon: z.object({ id: z.number().int() }).array().optional(),
  forms: z.object({ id: z.number().int() }).array().optional(),
});

export const GameDB = Game.extend({
  id: z.number().int(),
});

export const updateGame = Game.partial();

export type Game = z.infer<typeof Game>;
export type GameDB = z.infer<typeof GameDB>;
export type updateGame = z.infer<typeof updateGame>;
export const Games = prisma.game;
