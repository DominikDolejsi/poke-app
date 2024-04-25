import { z } from "zod";
import { prisma } from "../../../db.js";
import { pokemonFormDB } from "../pokemon_forms/pokemonForms.model.js";
import { formTypeDB } from "../form_types/formTypes.model.js";
import { gameDB } from "../games/games.model.js";
import { pokemonTypeDB } from "../pokemon_types/pokemonTypes.model.js";

const basePokemon = z.object({
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
  firstType: pokemonTypeDB,
  secondType: pokemonTypeDB.nullable(),
  formTypes: formTypeDB.array(),
  games: gameDB.array(),
  forms: pokemonFormDB.array(),
});

const baseUpdatePokemon = basePokemon.partial();

const basePokemonDB = basePokemon.extend({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.nullable(z.date()),
  listEntities: z.object({ id: z.number().int() }).array(),
});

export const pokemonDB: z.ZodType<PokemonDB> = basePokemonDB.extend({
  previousEvolution: z.lazy(() => pokemonDB.nullable()),
  nextEvolution: z.lazy(() => pokemonDB.array()),
});

export const pokemon: z.ZodType<Pokemon> = basePokemon.extend({
  previousEvolution: z.lazy(() => pokemonDB.nullable()),
  nextEvolution: z.lazy(() => pokemonDB.array()),
});

export const updatePokemon: z.ZodType<UpdatePokemon> = baseUpdatePokemon.extend(
  {
    previousEvolution: z.lazy(() => pokemonDB.nullable().optional()),
    nextEvolution: z.lazy(() => pokemonDB.array().optional()),
  },
);

export type Pokemon = z.infer<typeof basePokemon> & {
  previousEvolution: PokemonDB | null;
  nextEvolution: PokemonDB[];
};
export type UpdatePokemon = z.infer<typeof baseUpdatePokemon> & {
  previousEvolution?: PokemonDB | null;
  nextEvolution?: PokemonDB[];
};

export type PokemonDB = z.infer<typeof basePokemonDB> & {
  previousEvolution: PokemonDB | null;
  nextEvolution: PokemonDB[];
};

export const Pokemons = prisma.pokemon;
