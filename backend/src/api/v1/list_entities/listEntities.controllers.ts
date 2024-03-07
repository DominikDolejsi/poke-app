import { Request, Response, NextFunction } from "express";
import { ListEntity, ListEntityDB } from "./listEntities.model.js";
import * as listEntitiesServices from "./listEntities.services.js";
import { paramsWithId } from "../../../types/paramsWithId.js";
import { IdList } from "../../../types/idList.js";
import { EmptyParams, EmptyBody } from "../../../types/expressTypes.js";
import { ReqQuery } from "../../../types/queryTypes.js";
import { queryFormater } from "../../../utils/queryFormater.js";

export const getAll = async (
  req: Request<EmptyParams, EmptyBody, EmptyBody, ReqQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqQuery = queryFormater(req.query);
    const foundListEntities = await listEntitiesServices.findAll(reqQuery);
    res.status(200).json(foundListEntities);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<Record<string, never>, ListEntityDB, ListEntity>,
  res: Response<ListEntityDB>,
  next: NextFunction,
) => {
  try {
    const createdListEntity = await listEntitiesServices.create(req.body);
    res.status(201).json(createdListEntity);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithId, ListEntityDB>,
  res: Response<ListEntityDB>,
  next: NextFunction,
) => {
  try {
    const foundListEntity = await listEntitiesServices.findOne(Number(req.params.id));
    res.status(200).json(foundListEntity);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithId, ListEntityDB, ListEntity>,
  res: Response<ListEntityDB>,
  next: NextFunction,
) => {
  try {
    const updatedListEntity = await listEntitiesServices.update(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(updatedListEntity);
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
    const deletedListEntity = await listEntitiesServices.deleteOne(Number(req.params.id));
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
    const deletedListEntities = await listEntitiesServices.deleteMany(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
