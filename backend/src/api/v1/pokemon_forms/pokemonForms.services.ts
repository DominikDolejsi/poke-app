import { FormatedQuery } from "../../../types/queryTypes.js";
import {
  PokemonForms,
  PokemonForm,
  PokemonFormDB,
  updatePokemonForm,
} from "./pokemonForms.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: FormatedQuery): Promise<PokemonFormDB[]> => {
  const foundPokemonForms = await PokemonForms.findMany({
    take: limit,
    skip: offset,
    include: {
      firstType: deep,
      secondType: deep,
      pokemon: deep,
      games: deep,
      listEntities: deep,
    },
  });
  return foundPokemonForms;
};

export const create = async (
  newPokemonForm: PokemonForm,
): Promise<PokemonFormDB> => {
  const { pokemon, firstType, secondType, formTypes, games, ...props } =
    newPokemonForm;

  let updatedPokemonForm;

  const createdPokemonForm = await PokemonForms.create({
    data: {
      ...props,
      pokemon: { connect: { id: pokemon.id } },
    },
    include: {
      firstType: true,
      secondType: true,
      pokemon: true,
      games: true,
      listEntities: true,
    },
  });

  if (formTypes) {
    const formTypeIds = formTypes.map((formType) => {
      return { id: formType.id };
    });

    updatedPokemonForm = await PokemonForms.update({
      where: { id: createdPokemonForm.id },
      data: {
        formTypes: { connect: formTypeIds },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (firstType) {
    updatedPokemonForm = await PokemonForms.update({
      where: { id: createdPokemonForm.id },
      data: {
        firstType: { connect: { id: firstType.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (secondType) {
    updatedPokemonForm = await PokemonForms.update({
      where: { id: createdPokemonForm.id },
      data: {
        secondType: { connect: { id: secondType.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (games) {
    const gameIds = games.map((game) => {
      return { id: game.id };
    });

    updatedPokemonForm = await PokemonForms.update({
      where: { id: createdPokemonForm.id },
      data: {
        games: { connect: gameIds },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (updatedPokemonForm) return updatedPokemonForm;

  return createdPokemonForm;
};

export const findOne = async (
  pokemonFormId: number,
): Promise<PokemonFormDB> => {
  const foundPokemonForm = await PokemonForms.findUniqueOrThrow({
    where: { id: pokemonFormId },
    include: {
      firstType: true,
      secondType: true,
      pokemon: true,
      games: true,
      listEntities: true,
    },
  });
  return foundPokemonForm;
};

export const update = async (
  pokemonFormId: number,
  newPokemonForm: updatePokemonForm,
): Promise<PokemonFormDB> => {
  const { pokemon, firstType, secondType, formTypes, games, ...props } =
    newPokemonForm;

  let updatedPokemonForm;

  updatedPokemonForm = await PokemonForms.update({
    where: { id: pokemonFormId },
    data: {
      ...props,
    },
    include: {
      firstType: true,
      secondType: true,
      pokemon: true,
      games: true,
      listEntities: true,
    },
  });
  if (pokemon) {
    updatedPokemonForm = await PokemonForms.update({
      where: { id: pokemonFormId },
      data: {
        pokemon: { connect: { id: pokemon.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (formTypes) {
    const formTypeIds = formTypes.map((formType) => {
      return { id: formType.id };
    });

    updatedPokemonForm = await PokemonForms.update({
      where: { id: pokemonFormId },
      data: {
        formTypes: { connect: formTypeIds },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (firstType) {
    updatedPokemonForm = await PokemonForms.update({
      where: { id: pokemonFormId },
      data: {
        firstType: { connect: { id: firstType.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (secondType) {
    updatedPokemonForm = await PokemonForms.update({
      where: { id: pokemonFormId },
      data: {
        secondType: { connect: { id: secondType.id } },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (games) {
    const gameIds = games.map((game) => {
      return { id: game.id };
    });

    updatedPokemonForm = await PokemonForms.update({
      where: { id: pokemonFormId },
      data: {
        games: { set: gameIds },
      },
      include: {
        firstType: true,
        secondType: true,
        pokemon: true,
        games: true,
        listEntities: true,
      },
    });
  }

  if (updatedPokemonForm) return updatedPokemonForm;

  return updatedPokemonForm;
};

export const deleteOne = async (pokemonId: number): Promise<PokemonFormDB> => {
  const deletedPokemonForm = await PokemonForms.delete({
    where: { id: pokemonId },
    include: {
      firstType: true,
      secondType: true,
      pokemon: true,
      games: true,
      listEntities: true,
    },
  });
  return deletedPokemonForm;
};
