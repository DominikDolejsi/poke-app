import {
  ListEntities,
  ListEntityDB,
  ListEntity,
  updateListEntity,
} from "./listEntities.model.js";
import { IdList } from "../../../types/IdList.js";
import { FormatedQuery } from "../../../types/QueryTypes.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: FormatedQuery): Promise<ListEntityDB[]> => {
  const foundListEntites = await ListEntities.findMany({
    take: limit,
    skip: offset,
    include: { pokemon: deep, list: deep, form: deep },
  });
  return foundListEntites;
};

export const create = async (
  newListEntity: ListEntity,
): Promise<ListEntityDB> => {
  const { list, pokemon, form, ...props } = newListEntity;

  let connectedListEntity;

  const createdListEntity = await ListEntities.create({
    data: {
      ...props,
      list: { connect: { id: list.id } },
    },
    include: { pokemon: true, list: true, form: true },
  });

  if (pokemon) {
    connectedListEntity = await ListEntities.update({
      where: { id: createdListEntity.id },
      data: {
        pokemon: { connect: { id: pokemon.id } },
      },
      include: { pokemon: true, list: true, form: true },
    });
  }

  if (form) {
    connectedListEntity = await ListEntities.update({
      where: { id: createdListEntity.id },
      data: {
        form: { connect: { id: form.id } },
      },
      include: { pokemon: true, list: true, form: true },
    });
  }
  if (connectedListEntity) {
    return connectedListEntity;
  }

  return createdListEntity;
};

export const findOne = async (listEntityId: number): Promise<ListEntityDB> => {
  const foundListEntity = await ListEntities.findUniqueOrThrow({
    where: { id: listEntityId },
    include: { pokemon: true, list: true, form: true },
  });
  return foundListEntity;
};

export const update = async (
  listEntityId: number,
  newListEntity: updateListEntity,
): Promise<ListEntityDB> => {
  const { list, pokemon, form, ...props } = newListEntity;

  let updatedPokemonForm;

  updatedPokemonForm = await ListEntities.update({
    where: { id: listEntityId },
    data: props,
    include: { pokemon: true, list: true, form: true },
  });

  if (list) {
    updatedPokemonForm = await ListEntities.update({
      where: { id: listEntityId },
      data: {
        list: { connect: { id: list.id } },
      },
      include: { pokemon: true, list: true, form: true },
    });
  }

  if (pokemon) {
    updatedPokemonForm = await ListEntities.update({
      where: { id: listEntityId },
      data: {
        pokemon: { connect: { id: pokemon.id } },
      },
      include: { pokemon: true, list: true, form: true },
    });
  }

  if (form) {
    updatedPokemonForm = await ListEntities.update({
      where: { id: listEntityId },
      data: {
        form: { connect: { id: form.id } },
      },
      include: { pokemon: true, list: true, form: true },
    });
  }

  return updatedPokemonForm;
};

export const deleteOne = async (
  listEntityId: number,
): Promise<ListEntityDB> => {
  const deletedListEntity = await ListEntities.delete({
    where: { id: listEntityId },
    include: { pokemon: true, list: true, form: true },
  });
  return deletedListEntity;
};

export const deleteMany = async (
  IdList: IdList,
): Promise<{ count: number }> => {
  const deletedGame = await ListEntities.deleteMany({
    where: { id: { in: IdList.idList } },
  });
  return deletedGame;
};
