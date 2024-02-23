import { FormatedQuery } from "../../../types/QueryTypes.js";
import {
  Pokemons,
  PokemonDB,
  Pokemon,
  updatePokemon,
} from "./pokemons.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: FormatedQuery): Promise<PokemonDB[]> => {
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

export const create = async (newPokemon: Pokemon): Promise<PokemonDB> => {
  const { games, firstType, secondType, forms, formTypes, ...rest } = newPokemon;

  const include = {
    firstType: true,
    secondType: true,
    forms: true,
    games: true,
    listEntities: true,
    formTypes: true,
  }

  let updatedPokemon;

  const createdPokemon = await Pokemons.create({
    data: {
      ...rest,
      firstType: { connect: { id: firstType.id } },
    },
    include,
  });

  if (secondType) {
    updatedPokemon = await Pokemons.update({
      where: { id: createdPokemon.id },
      data: {
        secondType: { connect: { id: secondType.id } },
      },
      include,
    });
  }

  if (formTypes) {
    const formTypeIds = formTypes.map((formType) => {
      return { id: formType.id };
    });

    updatedPokemon = await Pokemons.update({
      where: { id: createdPokemon.id },
      data: {
        formTypes: { connect: formTypeIds },
      },
      include,
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
      include,
    });
  }

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedPokemon = await Pokemons.update({
      where: { id: createdPokemon.id },
      data: {
        games: { connect: formIds },
      },
      include,
    });
  }

  if (updatedPokemon) return updatedPokemon;

  return createdPokemon;
};

export const findOne = async (
  uniqueValue: number,
  { id }: FormatedQuery,
): Promise<PokemonDB> => {
  const foundPokemon = await Pokemons.findUniqueOrThrow({
    where: id ? { id: uniqueValue } : { nationalIndex: uniqueValue },
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
  const { games, firstType, secondType, forms, formTypes, ...rest } = newPokemon;

  const include = {
    firstType: true,
    secondType: true,
    forms: true,
    games: true,
    listEntities: true,
    formTypes: true,
  }

  let updatedPokemon: PokemonDB;

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
    updatedPokemon = await Pokemons.update({
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
    updatedPokemon = await Pokemons.update({
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

  if (formTypes) {
    const formTypeIds = formTypes.map((formType) => {
      return { id: formType.id };
    });

    updatedPokemon = await Pokemons.update({
      where: { id: pokemonId },
      data: {
        formTypes: { connect: formTypeIds },
      },
      include,
    });
  }

  if (games) {
    const gameIds = games.map((game) => {
      return { id: game.id };
    });

    updatedPokemon = await Pokemons.update({
      where: { id: pokemonId },
      data: {
        games: { set: gameIds },
      },
      include,
    });
  }

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedPokemon = await Pokemons.update({
      where: { id: pokemonId },
      data: {
        games: { set: formIds },
      },
      include,
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
