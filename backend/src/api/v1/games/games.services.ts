import { ManyQuery } from "../../../types/queryTypes.js";
import { Games, UpdateGame, Game } from "./games.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundGames> => {
  const foundGames = await Games.findMany({
    take: limit,
    skip: offset,
    include: { pokemon: deep, forms: deep },
  });
  return foundGames;
};

export const create = async (
  newGame: Game,
  deep: boolean,
): Promise<typeof createdGame> => {
  const { pokemon, forms, ...rest } = newGame;

  const createdGame = await Games.create({
    data: {
      ...rest,
      pokemon: pokemon
        ? { connect: pokemon.map((pokemon) => ({ id: pokemon.id })) }
        : undefined,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
    },
    include: { pokemon: deep, forms: deep },
  });

  return createdGame;
};

export const findOne = async (
  gameId: number,
  deep: boolean,
): Promise<typeof foundGame> => {
  const foundGame = await Games.findUniqueOrThrow({
    where: { id: gameId },
    include: { pokemon: deep, forms: deep },
  });
  return foundGame;
};

export const update = async (
  gameId: number,
  newGame: UpdateGame,
  deep: boolean,
): Promise<typeof updatedGame> => {
  const { pokemon, forms, ...rest } = newGame;

  const updatedGame = await Games.update({
    where: { id: gameId },
    data: {
      ...rest,
      pokemon: pokemon
        ? { connect: pokemon.map((pokemon) => ({ id: pokemon.id })) }
        : undefined,
      forms: forms
        ? { connect: forms.map((form) => ({ id: form.id })) }
        : undefined,
    },
    include: { pokemon: deep, forms: deep },
  });

  return updatedGame;
};

export const deleteOne = async (
  gameId: number,
): Promise<typeof deletedGame> => {
  const deletedGame = await Games.delete({
    where: { id: gameId },
  });
  return deletedGame;
};
