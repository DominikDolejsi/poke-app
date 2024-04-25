import {
  ListEntities,
  ListEntity,
  updateListEntity,
} from "./listEntities.model.js";
import { ManyQuery } from "../../../types/queryTypes.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundListEntites> => {
  const foundListEntites = await ListEntities.findMany({
    take: limit,
    skip: offset,
    include: { pokemon: deep, list: deep, form: deep },
  });
  return foundListEntites;
};

export const create = async (
  newListEntity: ListEntity,
  deep: boolean,
): Promise<typeof createdListEntity> => {
  const { list, pokemon, form, ...props } = newListEntity;

  const createdListEntity = await ListEntities.create({
    data: {
      ...props,
      list: { connect: { id: list.id } },
      pokemon: pokemon ? { connect: { id: pokemon.id } } : undefined,
      form: form ? { connect: { id: form.id } } : undefined,
    },
    include: { pokemon: deep, list: deep, form: deep },
  });

  return createdListEntity;
};

export const findOne = async (
  listEntityId: number,
  deep: boolean,
): Promise<typeof foundListEntity> => {
  const foundListEntity = await ListEntities.findUniqueOrThrow({
    where: { id: listEntityId },
    include: { pokemon: deep, list: deep, form: deep },
  });
  return foundListEntity;
};

export const update = async (
  listEntityId: number,
  newListEntity: updateListEntity,
  deep: boolean,
): Promise<typeof updatedListEntity> => {
  const { list, pokemon, form, ...props } = newListEntity;

  const updatedListEntity = await ListEntities.update({
    where: { id: listEntityId },
    data: {
      ...props,
      list: list ? { connect: { id: list.id } } : undefined,
      pokemon: pokemon ? { connect: { id: pokemon.id } } : undefined,
      form: form ? { connect: { id: form.id } } : undefined,
    },
    include: { pokemon: deep, list: deep, form: deep },
  });

  return updatedListEntity;
};

export const deleteOne = async (
  listEntityId: number,
): Promise<typeof deletedListEntity> => {
  const deletedListEntity = await ListEntities.delete({
    where: { id: listEntityId },
  });
  return deletedListEntity;
};

export const deleteMany = async (
  listEntityIds: number[],
  deleteAll: boolean,
): Promise<typeof deletedListEntities> => {
  const deletedListEntities = await ListEntities.deleteMany({
    where: deleteAll ? undefined : { id: { in: listEntityIds } },
  });
  return deletedListEntities;
};
