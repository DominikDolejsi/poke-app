import { Request, Response, NextFunction } from "express";
import { updateUser, user } from "./users.model.js";
import * as usersServices from "./users.services.js";
import { zParse } from "../../../utils/zParse.js";
import {
  createSchema,
  deleteUserSchema,
  getAllSchema,
  getOneUserSchema,
  updateUserSchema,
} from "../../../types/reqSchemaTypes.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = await zParse(getAllSchema, req);

    const foundUsers = await usersServices.findAll(query);
    res.status(200).json(foundUsers);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body, query } = await zParse(
      createSchema.extend({ body: user }),
      req,
    );

    const createdUser = await usersServices.create(body, query.deep);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query, params } = await zParse(getOneUserSchema, req);

    const foundUser = await usersServices.findOne(params.id, query.deep);
    res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { params, body, query } = await zParse(
      updateUserSchema.extend({ body: updateUser }),
      req,
    );

    const updatedUser = await usersServices.update(params.id, body, query.deep);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { params } = await zParse(deleteUserSchema, req);

    const deletedUser = await usersServices.deleteOne(params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
