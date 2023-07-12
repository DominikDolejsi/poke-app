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
  req: Request<Record<string, never>, UserDB, User>,
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
  req: Request<ParamsWithUuid, UserDB>,
  res: Response<UserDB>,
  next: NextFunction,
) => {
  try {
    const foundUser = await usersServices.findOne(req.params.id);
    res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithUuid, UserDB, User>,
  res: Response<UserDB>,
  next: NextFunction,
) => {
  try {
    const updatedUser = await usersServices.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request<ParamsWithUuid>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedUser = await usersServices.deleteOne(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
