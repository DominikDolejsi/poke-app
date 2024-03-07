import { z } from "zod";
import { prisma } from "../../../db.js";
import { isArrayinString } from "../../../utils/fieldFormater.js";

export const pokemon = z.object({
  name: z.string().min(1),
  formName: z.nullable(z.string().min(1)).optional(),
  species: z.string().min(1),
  gender: z.boolean(),
  nationalIndex: z.number().int(),
  generation: z.number().int(),
  health: z.number().int(),
  speed: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  specialAttack: z.number().int(),
  specialDefense: z.number().int(),
  femaleHealth: z.nullable(z.number().int()).optional(),
  femaleSpeed: z.nullable(z.number().int()).optional(),
  femaleAttack: z.nullable(z.number().int()).optional(),
  femaleDefense: z.nullable(z.number().int()).optional(),
  femaleSpecialAttack: z.nullable(z.number().int()).optional(),
  femaleSpecialDefense: z.nullable(z.number().int()).optional(),
  artworkMale: z.nullable(z.string().min(1)),
  artworkFemale: z.nullable(z.string().min(1)),
  artworkMaleShiny: z.nullable(z.string().min(1)),
  artworkFemaleShiny: z.nullable(z.string().min(1)),
  homeMale: z.nullable(z.string().min(1)),
  homeFemale: z.nullable(z.string().min(1)),
  homeMaleShiny: z.nullable(z.string().min(1)),
  homeFemaleShiny: z.nullable(z.string().min(1)),
  nextEvolution: z.nullable(z.string().refine(isArrayinString)).optional(),
  previousEvolution: z.nullable(z.string().refine(isArrayinString)).optional(),
  firstType: z.object({ id: z.number().int() }),
  secondType: z.nullable(z.object({ id: z.number().int() })),
  formTypes: z.nullable(z.object({ id: z.number().int() }).array()).optional(),
  games: z.object({ id: z.number().int() }).array().optional(),
  forms: z.object({ id: z.number().int() }).array().optional(),
});

export const pokemonDB = pokemon.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  listEntities: z.object({ id: z.number().int() }).array(),
});

export const updatePokemon = pokemon.partial();

export type Pokemon = z.infer<typeof pokemon>;
export type PokemonDB = z.infer<typeof pokemonDB>;
export type UpdatePokemon = z.infer<typeof updatePokemon>;
export const Pokemons = prisma.pokemon;
