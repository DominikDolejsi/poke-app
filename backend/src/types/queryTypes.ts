import { z } from "zod";

const LIMIT_DEFAULT = 20;
const OFFSET_DEFAULT = 0;

export const oneQuerySchema = z.object({
  deep: z
    .string()
    .min(1)
    .transform((value) => value === "true"),
});

export const manyQuerySchema = oneQuerySchema.extend({
  limit: z
    .string()
    .min(1)
    .transform((value) => parseInt(value, 10) || LIMIT_DEFAULT),
  offset: z
    .string()
    .min(1)
    .transform((value) => parseInt(value, 10) || OFFSET_DEFAULT),
});

export const pokemonOneQuerySchema = oneQuerySchema.extend({
  id: z
    .string()
    .min(1)
    .transform((value) => value === "true"),
});

export type OneQuery = z.infer<typeof oneQuerySchema>;
export type ManyQuery = z.infer<typeof manyQuerySchema>;
export type PokemonOneQuery = z.infer<typeof pokemonOneQuerySchema>;
