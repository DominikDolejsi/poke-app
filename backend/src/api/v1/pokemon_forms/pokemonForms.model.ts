import { z } from "zod";
import { prisma } from "../../../db.js";
import { genericDBModel } from "../../../types/genericDBTypes.js";

export const pokemonForm = z.object({
  name: z.string().min(1),
  generation: z.nullable(z.number().int()),
  health: z.nullable(z.number().int()),
  speed: z.nullable(z.number().int()),
  attack: z.nullable(z.number().int()),
  defense: z.nullable(z.number().int()),
  specialAttack: z.nullable(z.number().int()),
  specialDefense: z.nullable(z.number().int()),
  artworkMale: z.nullable(z.string().min(1)),
  artworkFemale: z.nullable(z.string().min(1)),
  artworkMaleShiny: z.nullable(z.string().min(1)),
  artworkFemaleShiny: z.nullable(z.string().min(1)),
  homeMale: z.nullable(z.string().min(1)),
  homeFemale: z.nullable(z.string().min(1)),
  homeMaleShiny: z.nullable(z.string().min(1)),
  homeFemaleShiny: z.nullable(z.string().min(1)),
  pokemon: genericDBModel,
  firstType: z.nullable(genericDBModel),
  secondType: z.nullable(genericDBModel),
  formTypes: genericDBModel.array(),
  games: genericDBModel.array(),
});

export const pokemonFormDB = pokemonForm.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  listEntities: genericDBModel.array(),
});

export const updatePokemonForm = pokemonForm.partial();

export type PokemonForm = z.infer<typeof pokemonForm>;
export type PokemonFormDB = z.infer<typeof pokemonFormDB>;
export type UpdatePokemonForm = z.infer<typeof updatePokemonForm>;
export const PokemonForms = prisma.pokemonForm;
