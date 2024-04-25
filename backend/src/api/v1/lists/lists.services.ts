import { ManyQuery } from "../../../types/queryTypes.js";
import { Lists, UpdateList, List } from "./lists.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundLists> => {
  const foundLists = await Lists.findMany({
    take: limit,
    skip: offset,
    include: { user: deep, entities: deep },
  });

  return foundLists;
};

export const create = async (
  newList: List,
  deep: boolean,
): Promise<typeof createdList> => {
  const { user, ...rest } = newList;

  const createdList = await Lists.create({
    data: {
      ...rest,
      user: { connect: { id: user.id } },
    },
    include: { user: deep, entities: deep },
  });

  return createdList;
};

export const findOne = async (
  listid: number,
  deep: boolean,
): Promise<typeof foundList> => {
  const foundList = await Lists.findUniqueOrThrow({
    where: { id: listid },
    include: { user: deep, entities: deep },
  });
  return foundList;
};

export const update = async (
  listId: number,
  deep: boolean,
  newList: UpdateList,
): Promise<typeof updatedList> => {
  const { user, ...rest } = newList;

  const updatedList = await Lists.update({
    where: { id: listId },
    data: {
      ...rest,
      user: user ? { connect: { id: user.id } } : undefined,
    },
    include: { user: deep, entities: deep },
  });

  return updatedList;
};

export const deleteOne = async (
  listId: number,
): Promise<typeof deletedList> => {
  const deletedList = await Lists.delete({
    where: { id: listId },
  });
  return deletedList;
};

export const deleteMany = async (
  listIds: number[],
  deleteAll: boolean,
): Promise<typeof deletedLists> => {
  const deletedLists = await Lists.deleteMany({
    where: deleteAll ? undefined : { id: { in: listIds } },
  });
  return deletedLists;
};
