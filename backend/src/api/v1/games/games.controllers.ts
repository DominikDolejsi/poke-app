import { Request, Response, NextFunction } from "express";
import { game, updateGame } from "./games.model.js";
import * as gamesServices from "./games.services.js";
import { zParse } from "../../../utils/zParse.js";
import {
  createSchema,
  deleteSchema,
  getAllSchema,
  getOneSchema,
  updateSchema,
} from "../../../types/reqSchemaTypes.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = await zParse(getAllSchema, req);

    const foundGames = await gamesServices.findAll(query);
    res.status(200).json(foundGames);
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
      createSchema.extend({ body: game }),
      req,
    );

    const createdGame = await gamesServices.create(body, query.deep);
    res.status(201).json(createdGame);
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
    const { params, query } = await zParse(getOneSchema, req);

    const foundGame = await gamesServices.findOne(params.id, query.deep);
    res.status(200).json(foundGame);
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
    const { body, params, query } = await zParse(
      updateSchema.extend({ body: updateGame }),
      req,
    );

    const updatedGame = await gamesServices.update(params.id, body, query.deep);
    res.status(200).json(updatedGame);
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
    const { params } = await zParse(deleteSchema, req);

    const deletedGame = await gamesServices.deleteOne(params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
