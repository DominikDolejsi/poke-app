import { z } from "zod";
import { prisma } from "../../../db.js";

export const PokemonForm = z.object({
  name: z.string().min(1),
  species: z.nullable(z.string().min(1)),
  gender: z.nullable(z.boolean()),
  generation: z.nullable(z.number().int()),
  health: z.nullable(z.number().int()),
  speed: z.nullable(z.number().int()),
  attack: z.nullable(z.number().int()),
  defence: z.nullable(z.number().int()),
  specialAttack: z.nullable(z.number().int()),
  specialDefence: z.nullable(z.number().int()),
  artworkSprite: z.nullable(z.string().min(1)),
  artworkSpriteShiny: z.nullable(z.string().min(1)),
  homeMale: z.nullable(z.string().min(1)),
  homeFemale: z.nullable(z.string().min(1)),
  homeMaleShiny: z.nullable(z.string().min(1)),
  homeFemaleShiny: z.nullable(z.string().min(1)),
  pokemon: z.object({ id: z.number().int() }),
  firstType: z.nullable(z.object({ id: z.number().int() })).optional(),
  secondType: z.nullable(z.object({ id: z.number().int() })).optional(),
  formType: z.nullable(z.object({ id: z.number().int() })).optional(),
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
