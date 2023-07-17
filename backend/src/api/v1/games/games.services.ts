import { Games, GameDB, Game } from "./games.model.js";

export const findAll = async (): Promise<GameDB[]> => {
  const foundGames = await Games.findMany();
  return foundGames;
};

export const create = async (newGame: Game): Promise<GameDB> => {
  const createdGame = await Games.create({ data: newGame });
  return createdGame;
};

export const findOne = async (gameId: number): Promise<GameDB> => {
  const foundGame = await Games.findUniqueOrThrow({ where: { id: gameId } });
  return foundGame;
};

export const update = async (
  gameId: number,
  newGame: Game,
): Promise<GameDB> => {
  const updatedUser = await Games.update({
    where: { id: gameId },
    data: newGame,
  });
  return updatedUser;
};

export const deleteOne = async (gameId: number): Promise<GameDB> => {
  const deletedUser = await Games.delete({
    where: { id: gameId },
  });
  return deletedUser;
};
