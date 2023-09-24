import { Request, Response, NextFunction } from "express";
import { List, ListDB } from "./lists.model.js";
import * as listsServices from "./lists.services.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";
import { IdList } from "../../../types/IdList.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const foundLists = await listsServices.findAll();
    res.status(200).json(foundLists);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<Record<string, never>, ListDB, List>,
  res: Response<ListDB>,
  next: NextFunction,
) => {
  try {
    const createdList = await listsServices.create(req.body);
    res.status(201).json(createdList);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithId, ListDB>,
  res: Response<ListDB>,
  next: NextFunction,
) => {
  try {
    const foundList = await listsServices.findOne(Number(req.params.id));
    res.status(200).json(foundList);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithId, ListDB, List>,
  res: Response<ListDB>,
  next: NextFunction,
) => {
  try {
    const updatedList = await listsServices.update(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(updatedList);
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
    const deletedList = await listsServices.deleteOne(Number(req.params.id));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteMany = async (
  req: Request<Record<string, never>, Record<string, never>, IdList>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedLists = await listsServices.deleteMany(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
