import { Users, UserDB, User } from "./users.model.js";

export const findAll = async (): Promise<UserDB[]> => {
  const foundUsers = await Users.findMany();
  return foundUsers;
};

export const create = async (newUser: User): Promise<UserDB> => {
  const createdUser = await Users.create({ data: newUser });
  return createdUser;
};

export const findOne = async (userId: string): Promise<UserDB | null> => {
  const foundUser = await Users.findUnique({ where: { id: userId } });
  return foundUser;
};
