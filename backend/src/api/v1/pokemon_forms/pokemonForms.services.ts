import { ManyQuery } from "../../../types/queryTypes.js";
import {
  PokemonForms,
  UpdatePokemonForm,
  PokemonForm,
} from "./pokemonForms.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundPokemonForms> => {
  const foundPokemonForms = await PokemonForms.findMany({
    take: limit,
    skip: offset,
    include: {
      firstType: deep,
      secondType: deep,
      pokemon: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
    },
  });
  return foundPokemonForms;
};

export const create = async (
  newPokemonForm: PokemonForm,
  deep: boolean,
): Promise<typeof createdPokemonForm> => {
  const { pokemon, firstType, secondType, formTypes, games, ...rest } =
    newPokemonForm;

  const createdPokemonForm = await PokemonForms.create({
    data: {
      ...rest,
      pokemon: { connect: { id: pokemon.id } },
      firstType: firstType ? { connect: { id: firstType.id } } : undefined,
      secondType: secondType ? { connect: { id: secondType.id } } : undefined,
      games: games
        ? { connect: games.map((game) => ({ id: game.id })) }
        : undefined,
      formTypes: formTypes
        ? { connect: formTypes.map((formType) => ({ id: formType.id })) }
        : undefined,
    },
    include: {
      firstType: deep,
      secondType: deep,
      pokemon: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
    },
  });

  return createdPokemonForm;
};

export const findOne = async (
  pokemonFormId: number,
  deep: boolean,
): Promise<typeof foundPokemonForm> => {
  const foundPokemonForm = await PokemonForms.findUniqueOrThrow({
    where: { id: pokemonFormId },
    include: {
      firstType: deep,
      secondType: deep,
      pokemon: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
    },
  });
  return foundPokemonForm;
};

export const update = async (
  pokemonFormId: number,
  newPokemonForm: UpdatePokemonForm,
  deep: boolean,
): Promise<typeof updatedPokemonForm> => {
  const { pokemon, firstType, secondType, formTypes, games, ...props } =
    newPokemonForm;

  const updatedPokemonForm = await PokemonForms.update({
    where: { id: pokemonFormId },
    data: {
      ...props,
      pokemon: pokemon ? { connect: { id: pokemon.id } } : undefined,
      firstType: firstType ? { connect: { id: firstType.id } } : undefined,
      secondType: secondType ? { connect: { id: secondType.id } } : undefined,
      games: games
        ? { connect: games.map((game) => ({ id: game.id })) }
        : undefined,
      formTypes: formTypes
        ? { connect: formTypes.map((formType) => ({ id: formType.id })) }
        : undefined,
    },
    include: {
      firstType: deep,
      secondType: deep,
      pokemon: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
    },
  });

  return updatedPokemonForm;
};

export const deleteOne = async (
  pokemonId: number,
  deep: boolean,
): Promise<typeof deletedPokemonForm> => {
  const deletedPokemonForm = await PokemonForms.delete({
    where: { id: pokemonId },
    include: {
      firstType: deep,
      secondType: deep,
      pokemon: deep,
      games: deep,
      listEntities: deep,
      formTypes: deep,
    },
  });
  return deletedPokemonForm;
};
