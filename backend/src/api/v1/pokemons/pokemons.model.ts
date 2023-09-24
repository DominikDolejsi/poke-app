import { z } from "zod";
import { prisma } from "../../../db.js";
import { isArrayinString } from "../../../utils/fieldFormater.js";

export const Pokemon = z.object({
  name: z.string().min(1),
  species: z.string().min(1),
  gender: z.boolean(),
  nationalNumber: z.number().int(),
  generation: z.number().int(),
  health: z.number().int(),
  speed: z.number().int(),
  attack: z.number().int(),
  defence: z.number().int(),
  specialAttack: z.number().int(),
  specialDefence: z.number().int(),
  artworkSprite: z.nullable(z.string().min(1)),
  artworkSpriteShiny: z.nullable(z.string().min(1)),
  homeMale: z.nullable(z.string().min(1)),
  homeFemale: z.nullable(z.string().min(1)),
  homeMaleShiny: z.nullable(z.string().min(1)),
  homeFemaleShiny: z.nullable(z.string().min(1)),
  nextEvolution: z.nullable(z.string().refine(isArrayinString)).optional(),
  previousEvolution: z.nullable(z.string().refine(isArrayinString)).optional(),
  firstType: z.object({ id: z.number().int() }),
  secondType: z.nullable(z.object({ id: z.number().int() })),
  games: z.object({ id: z.number().int() }).array().optional(),
  forms: z.object({ id: z.number().int() }).array().optional(),
});

export const PokemonDB = Pokemon.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  listEntities: z.object({ id: z.number().int() }).array(),
});

export const updatePokemon = Pokemon.partial();

export type Pokemon = z.infer<typeof Pokemon>;
export type PokemonDB = z.infer<typeof PokemonDB>;
export type updatePokemon = z.infer<typeof updatePokemon>;
export const Pokemons = prisma.pokemon;
