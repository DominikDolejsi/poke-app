import { ManyQuery } from "../../../types/queryTypes.js";
import {
  PokemonTypes,
  UpdatePokemonType,
  PokemonType,
} from "./pokemonTypes.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundPokemonTypes> => {
  const foundPokemonTypes = await PokemonTypes.findMany({
    take: limit,
    skip: offset,
    include: {
      firstSlotPokemon: deep,
      secondSlotPokemon: deep,
      firstSlotForm: deep,
      secondSlotForm: deep,
    },
  });
  return foundPokemonTypes;
};

export const create = async (
  newPokemonType: PokemonType,
  deep: boolean,
): Promise<typeof createdPokemonType> => {
  const {
    firstSlotPokemon,
    secondSlotPokemon,
    firstSlotForm,
    secondSlotForm,
    ...rest
  } = newPokemonType;

  const createdPokemonType = await PokemonTypes.create({
    data: {
      ...rest,
      firstSlotPokemon: firstSlotPokemon
        ? {
            connect: firstSlotPokemon.map((firstSlotPokemon) => ({
              id: firstSlotPokemon.id,
            })),
          }
        : undefined,
      secondSlotPokemon: secondSlotPokemon
        ? {
            connect: secondSlotPokemon.map((secondSlotPokemon) => ({
              id: secondSlotPokemon.id,
            })),
          }
        : undefined,
      firstSlotForm: firstSlotForm
        ? {
            connect: firstSlotForm.map((firstSlotForm) => ({
              id: firstSlotForm.id,
            })),
          }
        : undefined,
      secondSlotForm: secondSlotForm
        ? {
            connect: secondSlotForm.map((secondSlotForm) => ({
              id: secondSlotForm.id,
            })),
          }
        : undefined,
    },
    include: {
      firstSlotPokemon: deep,
      secondSlotPokemon: deep,
      firstSlotForm: deep,
      secondSlotForm: deep,
    },
  });

  return createdPokemonType;
};

export const findOne = async (
  pokemonTypeId: number,
  deep: boolean,
): Promise<typeof foundPokemonType> => {
  const foundPokemonType = await PokemonTypes.findUniqueOrThrow({
    where: { id: pokemonTypeId },
    include: {
      firstSlotPokemon: deep,
      secondSlotPokemon: deep,
      firstSlotForm: deep,
      secondSlotForm: deep,
    },
  });
  return foundPokemonType;
};

export const update = async (
  pokemonTypeId: number,
  newPokemonType: UpdatePokemonType,
  deep: boolean,
): Promise<typeof updatedPokemonType> => {
  const {
    firstSlotPokemon,
    secondSlotPokemon,
    firstSlotForm,
    secondSlotForm,
    ...rest
  } = newPokemonType;

  const updatedPokemonType = await PokemonTypes.update({
    where: { id: pokemonTypeId },
    data: {
      ...rest,
      firstSlotPokemon: firstSlotPokemon
        ? {
            connect: firstSlotPokemon.map((firstSlotPokemon) => ({
              id: firstSlotPokemon.id,
            })),
          }
        : undefined,
      secondSlotPokemon: secondSlotPokemon
        ? {
            connect: secondSlotPokemon.map((secondSlotPokemon) => ({
              id: secondSlotPokemon.id,
            })),
          }
        : undefined,
      firstSlotForm: firstSlotForm
        ? {
            connect: firstSlotForm.map((firstSlotForm) => ({
              id: firstSlotForm.id,
            })),
          }
        : undefined,
      secondSlotForm: secondSlotForm
        ? {
            connect: secondSlotForm.map((secondSlotForm) => ({
              id: secondSlotForm.id,
            })),
          }
        : undefined,
    },
    include: {
      firstSlotPokemon: deep,
      secondSlotPokemon: deep,
      firstSlotForm: deep,
      secondSlotForm: deep,
    },
  });

  return updatedPokemonType;
};

export const deleteOne = async (
  pokemonTypeId: number,
  deep: boolean,
): Promise<typeof deletedPokemonType> => {
  const deletedPokemonType = await PokemonTypes.delete({
    where: { id: pokemonTypeId },
    include: {
      firstSlotPokemon: deep,
      secondSlotPokemon: deep,
      firstSlotForm: deep,
      secondSlotForm: deep,
    },
  });
  return deletedPokemonType;
};
