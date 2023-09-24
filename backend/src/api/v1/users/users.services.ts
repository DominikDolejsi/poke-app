import { Users, UserDB, User, updateUser } from "./users.model.js";

export const findAll = async (): Promise<UserDB[]> => {
  const foundUsers = await Users.findMany({ include: { lists: true } });
  return foundUsers;
};

export const create = async (newUser: User): Promise<UserDB> => {
  const createdUser = await Users.create({
    data: newUser,
    include: { lists: true },
  });

  return createdUser;
};

export const findOne = async (userId: string): Promise<UserDB> => {
  const foundUser = await Users.findUniqueOrThrow({
    where: { id: userId },
    include: { lists: true },
  });
  return foundUser;
};

export const update = async (
  userId: string,
  newUser: updateUser,
): Promise<UserDB> => {
  const updatedUser = await Users.update({
    where: { id: userId },
    data: newUser,
    include: { lists: true },
  });

  return updatedUser;
};

export const deleteOne = async (userId: string): Promise<UserDB> => {
  const deletedUser = await Users.delete({
    where: { id: userId },
    include: { lists: true },
  });
  return deletedUser;
};
