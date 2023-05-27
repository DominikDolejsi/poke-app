import { Request, Response, NextFunction } from "express";
import { User, UserDB } from "./users.model.js";
import * as usersServices from "./users.services.js";
import { ParamsWithUuid } from "../../../types/paramsWithId.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const foundUsers = await usersServices.findAll();
    res.status(200).json(foundUsers);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<object, UserDB, User>,
  res: Response<UserDB>,
  next: NextFunction,
) => {
  try {
    const createdUser = await usersServices.create(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithUuid>,
  res: Response<>,
  next: NextFunction,
) => {
  try {
    const foundUser = await usersServices.findUser();
    res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
};

// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const updatedUser = await usersServices.updateUser();
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const deletedUser = await usersServices.deleteUser();
//     res.status(200).json(deletedUser);
//   } catch (error) {
//     next(error);
//   }
// };
