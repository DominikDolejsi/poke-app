import { Request, Response, NextFunction } from "express";
import { game, gameDB, UpdateGame } from "./games.model.js";
import * as gamesServices from "./games.services.js";
import { paramsWithId } from "../../../types/paramsWithId.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const foundGames = await gamesServices.findAll();
    res.status(200).json(foundGames);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<Record<string, never>, GameDB, Game>,
  res: Response<GameDB>,
  next: NextFunction,
) => {
  try {
    const createdGame = await gamesServices.create(req.body);
    res.status(201).json(createdGame);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithId, GameDB>,
  res: Response<GameDB>,
  next: NextFunction,
) => {
  try {
    const foundGame = await gamesServices.findOne(Number(req.params.id));
    res.status(200).json(foundGame);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithId, GameDB, UpdateGame>,
  res: Response<GameDB>,
  next: NextFunction,
) => {
  try {
    const updatedGame = await gamesServices.update(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedGame = await gamesServices.deleteOne(Number(req.params.id));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
