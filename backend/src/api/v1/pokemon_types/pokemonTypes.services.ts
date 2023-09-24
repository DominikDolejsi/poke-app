import {
  PokemonTypes,
  PokemonTypeDB,
  PokemonType,
  updatePokemonType,
} from "./pokemonTypes.model.js";

export const findAll = async (): Promise<PokemonTypeDB[]> => {
  const foundPokemonTypes = await PokemonTypes.findMany({
    include: {
      firstSlotPokemon: true,
      secondSlotPokemon: true,
      firstSlotForm: true,
      secondSlotForm: true,
    },
  });
  return foundPokemonTypes;
};

export const create = async (
  newPokemonType: PokemonType,
): Promise<PokemonTypeDB> => {
  const {
    firstSlotPokemon,
    secondSlotPokemon,
    firstSlotForm,
    secondSlotForm,
    ...rest
  } = newPokemonType;

  let updatedPokemonType;

  const createdPokemonType = await PokemonTypes.create({
    data: rest,
    include: {
      firstSlotPokemon: true,
      secondSlotPokemon: true,
      firstSlotForm: true,
      secondSlotForm: true,
    },
  });

  if (firstSlotPokemon) {
    const firstSlotPokemonIds = firstSlotPokemon.map((firstSlotPokemon) => {
      return { id: firstSlotPokemon.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: createdPokemonType.id },
      data: {
        firstSlotPokemon: { connect: firstSlotPokemonIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }
  if (secondSlotPokemon) {
    const secondSlotPokemonIds = secondSlotPokemon.map((secondSlotPokemon) => {
      return { id: secondSlotPokemon.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: createdPokemonType.id },
      data: {
        secondSlotPokemon: { connect: secondSlotPokemonIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }
  if (firstSlotForm) {
    const firstSlotFormIds = firstSlotForm.map((firstSlotForm) => {
      return { id: firstSlotForm.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: createdPokemonType.id },
      data: {
        firstSlotForm: { connect: firstSlotFormIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }
  if (secondSlotForm) {
    const secondSlotFormIds = secondSlotForm.map((secondSlotForm) => {
      return { id: secondSlotForm.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: createdPokemonType.id },
      data: {
        secondSlotForm: { connect: secondSlotFormIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }

  if (updatedPokemonType) return updatedPokemonType;

  return createdPokemonType;
};

export const findOne = async (
  pokemonTypeId: number,
): Promise<PokemonTypeDB> => {
  const foundPokemonType = await PokemonTypes.findUniqueOrThrow({
    where: { id: pokemonTypeId },
    include: {
      firstSlotPokemon: true,
      secondSlotPokemon: true,
      firstSlotForm: true,
      secondSlotForm: true,
    },
  });
  return foundPokemonType;
};

export const update = async (
  pokemonTypeId: number,
  newPokemonType: updatePokemonType,
): Promise<PokemonTypeDB> => {
  const {
    firstSlotPokemon,
    secondSlotPokemon,
    firstSlotForm,
    secondSlotForm,
    ...rest
  } = newPokemonType;

  let updatedPokemonType;

  updatedPokemonType = await PokemonTypes.update({
    where: { id: pokemonTypeId },
    data: rest,
    include: {
      firstSlotPokemon: true,
      secondSlotPokemon: true,
      firstSlotForm: true,
      secondSlotForm: true,
    },
  });

  if (firstSlotPokemon) {
    const firstSlotPokemonIds = firstSlotPokemon.map((firstSlotPokemon) => {
      return { id: firstSlotPokemon.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: updatedPokemonType.id },
      data: {
        firstSlotPokemon: { connect: firstSlotPokemonIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }
  if (secondSlotPokemon) {
    const secondSlotPokemonIds = secondSlotPokemon.map((secondSlotPokemon) => {
      return { id: secondSlotPokemon.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: updatedPokemonType.id },
      data: {
        secondSlotPokemon: { connect: secondSlotPokemonIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }
  if (firstSlotForm) {
    const firstSlotFormIds = firstSlotForm.map((firstSlotForm) => {
      return { id: firstSlotForm.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: updatedPokemonType.id },
      data: {
        firstSlotForm: { connect: firstSlotFormIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }
  if (secondSlotForm) {
    const secondSlotFormIds = secondSlotForm.map((secondSlotForm) => {
      return { id: secondSlotForm.id };
    });

    updatedPokemonType = await PokemonTypes.update({
      where: { id: updatedPokemonType.id },
      data: {
        secondSlotForm: { connect: secondSlotFormIds },
      },
      include: {
        firstSlotPokemon: true,
        secondSlotPokemon: true,
        firstSlotForm: true,
        secondSlotForm: true,
      },
    });
  }

  return updatedPokemonType;
};

export const deleteOne = async (
  pokemonTypeId: number,
): Promise<PokemonTypeDB> => {
  const deletedPokemonType = await PokemonTypes.delete({
    where: { id: pokemonTypeId },
    include: {
      firstSlotPokemon: true,
      secondSlotPokemon: true,
      firstSlotForm: true,
      secondSlotForm: true,
    },
  });
  return deletedPokemonType;
};
