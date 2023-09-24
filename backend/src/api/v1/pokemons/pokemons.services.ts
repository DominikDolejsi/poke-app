import { getAllQuery } from "../../../types/queryTypes.js";
import {
  Pokemons,
  PokemonDB,
  Pokemon,
  updatePokemon,
} from "./pokemons.model.js";

export const findAll = async (queries: getAllQuery): Promise<PokemonDB[]> => {
  const isDeep = queries.deep === "true" ? true : false;

  const foundPokemons = await Pokemons.findMany({
    take: Number.parseInt(queries.limit) ? Number.parseInt(queries.limit) : 20,
    skip: Number.parseInt(queries.offset) ? Number.parseInt(queries.offset) : 0,
    include: {
      firstType: isDeep,
      secondType: isDeep,
      forms: isDeep,
      games: isDeep,
      listEntities: isDeep,
    },
  });
  return foundPokemons;
};

export const create = async (newPokemon: Pokemon): Promise<PokemonDB> => {
  const { games, firstType, secondType, forms, ...rest } = newPokemon;

  let updatedPokemon;

  const createdPokemon = await Pokemons.create({
    data: {
      ...rest,
      firstType: { connect: { id: firstType.id } },
    },
    include: {
      firstType: true,
      secondType: true,
      forms: true,
      games: true,
      listEntities: true,
    },
  });

  if (secondType) {
    updatedPokemon = Pokemons.update({
      where: { id: createdPokemon.id },
      data: {
        secondType: { connect: { id: secondType.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        forms: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (games) {
    const gameIds = games.map((game) => {
      return { id: game.id };
    });

    updatedPokemon = Pokemons.update({
      where: { id: createdPokemon.id },
      data: {
        games: { connect: gameIds },
      },
      include: {
        firstType: true,
        secondType: true,
        forms: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedPokemon = Pokemons.update({
      where: { id: createdPokemon.id },
      data: {
        games: { connect: formIds },
      },
      include: {
        firstType: true,
        secondType: true,
        forms: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (updatedPokemon) return updatedPokemon;

  return createdPokemon;
};

export const findOne = async (pokemonId: number): Promise<PokemonDB> => {
  const foundPokemon = await Pokemons.findUniqueOrThrow({
    where: { id: pokemonId },
    include: {
      firstType: true,
      secondType: true,
      forms: true,
      games: true,
      listEntities: true,
    },
  });
  return foundPokemon;
};

export const update = async (
  pokemonId: number,
  newPokemon: updatePokemon,
): Promise<PokemonDB> => {
  const { games, firstType, secondType, forms, ...rest } = newPokemon;

  let updatedPokemon;

  updatedPokemon = await Pokemons.update({
    where: { id: pokemonId },
    data: rest,
    include: {
      firstType: true,
      secondType: true,
      forms: true,
      games: true,
      listEntities: true,
    },
  });

  if (firstType) {
    updatedPokemon = Pokemons.update({
      where: { id: pokemonId },
      data: {
        firstType: { connect: { id: firstType.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        forms: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (secondType) {
    updatedPokemon = Pokemons.update({
      where: { id: pokemonId },
      data: {
        secondType: { connect: { id: secondType.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        forms: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (games) {
    const gameIds = games.map((game) => {
      return { id: game.id };
    });

    updatedPokemon = Pokemons.update({
      where: { id: pokemonId },
      data: {
        games: { set: gameIds },
      },
      include: {
        firstType: true,
        secondType: true,
        forms: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedPokemon = Pokemons.update({
      where: { id: pokemonId },
      data: {
        games: { set: formIds },
      },
      include: {
        firstType: true,
        secondType: true,
        forms: true,
        games: true,
        listEntities: true,
      },
    });
  }

  return updatedPokemon;
};

export const deleteOne = async (pokemonId: number): Promise<PokemonDB> => {
  const deletedPokemon = await Pokemons.delete({
    where: { id: pokemonId },
    include: {
      firstType: true,
      secondType: true,
      forms: true,
      games: true,
      listEntities: true,
    },
  });
  return deletedPokemon;
};

export const findOneByNationalNumber = async (
  pokemonNationalNumber: number,
): Promise<PokemonDB> => {
  const foundPokemon = await Pokemons.findUniqueOrThrow({
    where: { nationalNumber: pokemonNationalNumber },
    include: {
      firstType: true,
      secondType: true,
      forms: true,
      games: true,
      listEntities: true,
    },
  });
  return foundPokemon;
};
