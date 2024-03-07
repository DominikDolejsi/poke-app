import { ReqQuery } from "../../../types/queryTypes.js";
import {
  Pokemons,
  UpdatePokemon,
  PokemonDB,
  Pokemon,
} from "./pokemons.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ReqQuery): Promise<PokemonDB[]> => {
  const foundPokemons = await Pokemons.findMany({
    take: limit,
    skip: offset,
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
    },
  });
  return foundPokemons;
};

export const create = async (newPokemon: Pokemon, deep: boolean): Promise<PokemonDB> => {
  const { games, firstType, secondType, forms, formTypes, ...rest } = newPokemon;

  const include = {
    firstType: deep,
    secondType: deep,
    forms: deep,
    games: deep,
    listEntities: deep,
    formTypes: deep,
  }

  const createdPokemon = await Pokemons.create({
    data: {
      ...rest,
      firstType: { connect: { id: firstType.id } },
      secondType: secondType
        ? { connect: { id: secondType.id } }
        : undefined,
      formTypes: formTypes
        ? { connect: formTypes.map((formType) => ({ id: formType.id })) }
        : undefined,
      games: games
        ? { connect: games.map((game) => ({ id: game.id })) }
        : undefined,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
    },
    include,
  });

  return createdPokemon;
};

export const findOne = async (
  uniqueValue: number,
  { id, deep, }: ReqQuery,
): Promise<PokemonDB> => {
  const foundPokemon = await Pokemons.findUniqueOrThrow({
    where: id ? { id: uniqueValue } : { nationalIndex: uniqueValue },
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
    },
  });
  return foundPokemon;
};

export const update = async (
  pokemonId: number,
  newPokemon: UpdatePokemon,
  deep: boolean,
): Promise<PokemonDB> => {
  const { games, firstType, secondType, forms, formTypes, ...rest } = newPokemon;

  const include = {
    firstType: deep,
    secondType: deep,
    forms: deep,
    games: deep,
    listEntities: deep,
    formTypes: deep,
  }


  const updatedPokemon: PokemonDB = await Pokemons.update({
    where: { id: pokemonId },
    data: {
      ...rest,
      firstType: firstType
        ? { connect: { id: firstType.id } }
        : undefined,
      secondType: secondType
        ? { connect: { id: secondType.id } }
        : undefined,
      formTypes: formTypes
        ? { connect: formTypes.map((formType) => ({ id: formType.id })) }
        : undefined,
      games: games
        ? { connect: games.map((game) => ({ id: game.id })) }
        : undefined,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
    },
    include,
  });

  return updatedPokemon;
};

export const deleteOne = async (pokemonId: number, deep: boolean): Promise<PokemonDB> => {
  const deletedPokemon = await Pokemons.delete({
    where: { id: pokemonId },
    include: {
      firstType: deep,
      secondType: deep,
      forms: deep,
      games: deep,
      listEntities: deep,
    },
  });
  return deletedPokemon;
};
