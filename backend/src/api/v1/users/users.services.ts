import { Users, UserDB, User } from "./users.model.js";

export const findAll = async (): Promise<UserDB[]> => {
  const foundUsers = await Users.findMany();
  return foundUsers;
};

export const create = async (newUser: User): Promise<UserDB> => {
  const createdUser = await Users.create({ data: newUser });
  return createdUser;
};

export const findOne = async (userId: string): Promise<UserDB> => {
  const foundUser = await Users.findUniqueOrThrow({ where: { id: userId } });
  return foundUser;
};

export const update = async (
  userId: string,
  newUser: User,
): Promise<UserDB> => {
  const updatedUser = await Users.update({
    where: { id: userId },
    data: newUser,
  });
  return updatedUser;
};

export const deleteOne = async (userId: string): Promise<UserDB> => {
  const deletedUser = await Users.delete({
    where: { id: userId },
  });
  return deletedUser;
};
