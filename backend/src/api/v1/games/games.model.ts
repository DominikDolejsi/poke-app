import { z } from "zod";
import { prisma } from "../../../db.js";

export const Game = z.object({
  name: z.string().min(1),
});

export const GameDB = Game.extend({
  id: z.number().int(),
  // pokemon of zodtype pokemon
  // forms of zodtype pokemonForm
});

export type Game = z.infer<typeof Game>;
export type GameDB = z.infer<typeof GameDB>;
export const Games = prisma.game;