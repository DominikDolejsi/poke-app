import { ManyQuery, PokemonOneQuery } from "../../../types/queryTypes.js";
import { Pokemons, UpdatePokemon, Pokemon } from "./pokemons.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundPokemons> => {
  const foundPokemons = await Pokemons.findMany({
    take: limit,
    skip: offset,
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
      nextEvolution: deep,
      previousEvolution: deep,
      formTypes: deep,
    },
  });
  return foundPokemons;
};

export const create = async (
  newPokemon: Pokemon,
  deep: boolean,
): Promise<typeof createdPokemon> => {
  const {
    games,
    firstType,
    secondType,
    forms,
    formTypes,
    nextEvolution,
    previousEvolution,
    ...rest
  } = newPokemon;

  const createdPokemon = await Pokemons.create({
    data: {
      ...rest,
      firstType: { connect: { id: firstType.id } },
      secondType: secondType ? { connect: { id: secondType.id } } : undefined,
      formTypes: formTypes
        ? { connect: formTypes.map((formType) => ({ id: formType.id })) }
        : undefined,
      games: games
        ? { connect: games.map((game) => ({ id: game.id })) }
        : undefined,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
      nextEvolution: nextEvolution
        ? {
            connect: nextEvolution.map((nextEvolution) => ({
              id: nextEvolution.id,
            })),
          }
        : undefined,
      previousEvolution: previousEvolution
        ? { connect: { id: previousEvolution.id } }
        : undefined,
    },
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
      nextEvolution: deep,
      previousEvolution: deep,
      formTypes: deep,
    },
  });

  return createdPokemon;
};

export const findOne = async (
  pokemonId: number,
  { id, deep }: PokemonOneQuery,
): Promise<typeof foundPokemon> => {
  const foundPokemon = await Pokemons.findUniqueOrThrow({
    where: id ? { id: pokemonId } : { nationalIndex: pokemonId },
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
      nextEvolution: deep,
      previousEvolution: deep,
    },
  });
  return foundPokemon;
};

export const update = async (
  pokemonId: number,
  newPokemon: UpdatePokemon,
  deep: boolean,
): Promise<typeof updatedPokemon> => {
  const {
    games,
    firstType,
    secondType,
    forms,
    formTypes,
    nextEvolution,
    previousEvolution,
    ...rest
  } = newPokemon;

  const updatedPokemon = await Pokemons.update({
    where: { id: pokemonId },
    data: {
      ...rest,
      firstType: firstType ? { connect: { id: firstType.id } } : undefined,
      secondType: secondType ? { connect: { id: secondType.id } } : undefined,
      formTypes: formTypes
        ? { connect: formTypes.map((formType) => ({ id: formType.id })) }
        : undefined,
      games: games
        ? { connect: games.map((game) => ({ id: game.id })) }
        : undefined,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
      nextEvolution: nextEvolution
        ? {
            connect: nextEvolution.map((nextEvolution) => ({
              id: nextEvolution.id,
            })),
          }
        : undefined,
      previousEvolution: previousEvolution
        ? { connect: { id: previousEvolution.id } }
        : undefined,
    },
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
      nextEvolution: deep,
      previousEvolution: deep,
    },
  });

  return updatedPokemon;
};

export const deleteOne = async (
  pokemonId: number,
  deep: boolean,
): Promise<typeof deletedPokemon> => {
  const deletedPokemon = await Pokemons.delete({
    where: { id: pokemonId },
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
      nextEvolution: deep,
      previousEvolution: deep,
    },
  });
  return deletedPokemon;
};
