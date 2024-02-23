import { z } from "zod";
import { prisma } from "../../../db.js";

export const PokemonForm = z.object({
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
  pokemon: z.object({ id: z.number().int() }),
  firstType: z.nullable(z.object({ id: z.number().int() })).optional(),
  secondType: z.nullable(z.object({ id: z.number().int() })).optional(),
  formTypes: z.nullable(z.object({ id: z.number().int() }).array()).optional(),
  games: z.nullable(z.object({ id: z.number().int() }).array()).optional(),
});

export const PokemonFormDB = PokemonForm.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  listEntities: z.object({ id: z.number().int() }).array(),
});

export const updatePokemonForm = PokemonForm.partial();

export type PokemonForm = z.infer<typeof PokemonForm>;
export type PokemonFormDB = z.infer<typeof PokemonFormDB>;
export type updatePokemonForm = z.infer<typeof updatePokemonForm>;
export const PokemonForms = prisma.pokemonForm;
