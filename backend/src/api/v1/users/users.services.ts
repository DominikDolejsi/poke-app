import { ManyQuery } from "../../../types/queryTypes.js";
import { Users, UpdateUser, User } from "./users.model.js";

export const findAll = async ({
  limit,
  offset,
  deep,
}: ManyQuery): Promise<typeof foundUsers> => {
  const foundUsers = await Users.findMany({
    take: limit,
    skip: offset,
    include: { lists: deep },
  });
  return foundUsers;
};

export const create = async (
  newUser: User,
  deep: boolean,
): Promise<typeof createdUser> => {
  const createdUser = await Users.create({
    data: newUser,
    include: { lists: deep },
  });

  return createdUser;
};

export const findOne = async (
  userId: string,
  deep: boolean,
): Promise<typeof foundUser> => {
  const foundUser = await Users.findUniqueOrThrow({
    where: { id: userId },
    include: { lists: deep },
  });
  return foundUser;
};

export const update = async (
  userId: string,
  newUser: UpdateUser,
  deep: boolean,
): Promise<typeof updatedUser> => {
  const updatedUser = await Users.update({
    where: { id: userId },
    data: newUser,
    include: { lists: deep },
  });

  return updatedUser;
};

export const deleteOne = async (
  userId: string,
): Promise<typeof deletedUser> => {
  const deletedUser = await Users.delete({
    where: { id: userId },
  });
  return deletedUser;
};
