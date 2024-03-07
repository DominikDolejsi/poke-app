import { IdList } from "../../../types/idList.js";
import { FormatedQuery } from "../../../types/queryTypes.js";
import { Lists, ListDB, List, updateList } from "./lists.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: FormatedQuery): Promise<ListDB[]> => {
  const foundLists = await Lists.findMany({
    take: limit,
    skip: offset,
    include: { user: deep, entities: deep },
  });

  return foundLists;
};

export const create = async (newList: List): Promise<ListDB> => {
  const { user, ...rest } = newList;

  const createdList = await Lists.create({
    data: {
      ...rest,
      user: { connect: { id: user.id } },
    },
    include: { user: true, entities: true },
  });

  return createdList;
};

export const findOne = async (listid: number): Promise<ListDB> => {
  const foundGame = await Lists.findUniqueOrThrow({
    where: { id: listid },
    include: { user: true, entities: true },
  });
  return foundGame;
};

export const update = async (
  listId: number,
  newList: updateList,
): Promise<ListDB> => {
  const { user, ...rest } = newList;

  const updatedGame = await Lists.update({
    where: { id: listId },
    data: {
      ...rest,
    },
    include: { user: true, entities: true },
  });

  return updatedGame;
};

export const deleteOne = async (listId: number): Promise<ListDB> => {
  const deletedGame = await Lists.delete({
    where: { id: listId },
    include: { user: true },
  });
  return deletedGame;
};

export const deleteMany = async (
  IdList: IdList,
): Promise<{ count: number }> => {
  const deletedGame = await Lists.deleteMany({
    where: { id: { in: IdList.idList } },
  });
  return deletedGame;
};
