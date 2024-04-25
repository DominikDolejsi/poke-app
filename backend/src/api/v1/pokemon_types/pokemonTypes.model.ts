import { z } from "zod";
import { prisma } from "../../../db.js";
import { isArrayinString } from "../../../utils/fieldFormater.js";
import { genericDBModel } from "../../../types/genericDBTypes.js";

export const pokemonType = z.object({
  name: z.string().min(1),
  doubleTo: z.nullable(z.string().refine(isArrayinString)).optional(),
  doubleFrom: z.nullable(z.string().refine(isArrayinString)).optional(),
  halfTo: z.nullable(z.string().refine(isArrayinString)).optional(),
  halfFrom: z.nullable(z.string().refine(isArrayinString)).optional(),
  immuneTo: z.nullable(z.string().refine(isArrayinString)).optional(),
  immuneFrom: z.nullable(z.string().refine(isArrayinString)).optional(),
  firstSlotPokemon: genericDBModel.array().optional(),
  secondSlotPokemon: genericDBModel.array().optional(),
  firstSlotForm: genericDBModel.array().optional(),
  secondSlotForm: genericDBModel.array().optional(),
});

export const pokemonTypeDB = pokemonType.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
});

export const updatePokemonType = pokemonType.partial();

export type PokemonType = z.infer<typeof pokemonType>;
export type PokemonTypeDB = z.infer<typeof pokemonTypeDB>;
export type UpdatePokemonType = z.infer<typeof updatePokemonType>;

export const PokemonTypes = prisma.pokemonType;
