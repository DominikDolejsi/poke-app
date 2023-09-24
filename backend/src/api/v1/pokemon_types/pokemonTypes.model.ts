import { z } from "zod";
import { prisma } from "../../../db.js";
import { isArrayinString } from "../../../utils/fieldFormater.js";

export const PokemonType = z.object({
  name: z.string().min(1),
  doubleTo: z.nullable(z.string().refine(isArrayinString)).optional(),
  doubleFrom: z.nullable(z.string().refine(isArrayinString)).optional(),
  halfTo: z.nullable(z.string().refine(isArrayinString)).optional(),
  halfFrom: z.nullable(z.string().refine(isArrayinString)).optional(),
  immuneTo: z.nullable(z.string().refine(isArrayinString)).optional(),
  immuneFrom: z.nullable(z.string().refine(isArrayinString)).optional(),
  firstSlotPokemon: z.object({ id: z.number().int() }).array().optional(),
  secondSlotPokemon: z.object({ id: z.number().int() }).array().optional(),
  firstSlotForm: z.object({ id: z.number().int() }).array().optional(),
  secondSlotForm: z.object({ id: z.number().int() }).array().optional(),
});

export const PokemonTypeDB = PokemonType.extend({
  id: z.number().int(),
});

export const updatePokemonType = PokemonType.partial();

export type PokemonType = z.infer<typeof PokemonType>;
export type PokemonTypeDB = z.infer<typeof PokemonTypeDB>;
export type updatePokemonType = z.infer<typeof updatePokemonType>;

export const PokemonTypes = prisma.pokemonType;
