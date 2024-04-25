import { Games, gameDB, game, UpdateGame } from "./games.model.js";

export const findAll = async (): Promise<GameDB[]> => {
  const foundGames = await Games.findMany({
    include: { pokemon: true, forms: true },
  });
  return foundGames;
};

export const create = async (newGame: Game): Promise<GameDB> => {
  const { pokemon, forms, ...rest } = newGame;

  let updatedGame;

  const createdGame = await Games.create({
    data: rest,
    include: { pokemon: true, forms: true },
  });

  if (pokemon) {
    const pokemonIds = pokemon.map((pokemon) => {
      return { id: pokemon.id };
    });

    updatedGame = await Games.update({
      where: { id: createdGame.id },
      data: {
        pokemon: { connect: pokemonIds },
      },
      include: { pokemon: true, forms: true },
    });
  }

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedGame = await Games.update({
      where: { id: createdGame.id },
      data: {
        forms: { connect: formIds },
      },
      include: { pokemon: true, forms: true },
    });
  }

  if (updatedGame) return updatedGame;

  return createdGame;
};

export const findOne = async (gameId: number): Promise<GameDB> => {
  const foundGame = await Games.findUniqueOrThrow({
    where: { id: gameId },
    include: { pokemon: true, forms: true },
  });
  return foundGame;
};

export const update = async (
  gameId: number,
  newGame: UpdateGame,
): Promise<GameDB> => {
  const { pokemon, forms, ...rest } = newGame;

  let updatedGame;

  updatedGame = await Games.update({
    where: { id: gameId },
    data: rest,
    include: { pokemon: true, forms: true },
  });

  if (pokemon) {
    const pokemonIds = pokemon.map((pokemon) => {
      return { id: pokemon.id };
    });

    updatedGame = await Games.update({
      where: { id: gameId },
      data: {
        pokemon: { set: pokemonIds },
      },
      include: { pokemon: true, forms: true },
    });
  }

  if (forms) {
    const formIds = forms.map((form) => {
      return { id: form.id };
    });

    updatedGame = await Games.update({
      where: { id: gameId },
      data: {
        forms: { set: formIds },
      },
      include: { pokemon: true, forms: true },
    });
  }

  return updatedGame;
};

export const deleteOne = async (gameId: number): Promise<GameDB> => {
  const deletedGame = await Games.delete({
    where: { id: gameId },
    include: { pokemon: true, forms: true },
  });
  return deletedGame;
};
