import { Request, Response, NextFunction } from "express";
import { list, listDB, updateList } from "./lists.model.js";
import * as listsServices from "./lists.services.js";
import { paramsWithId } from "../../../types/paramsWithId.js";
import { IdList } from "../../../types/idList.js";
import { EmptyParams, EmptyBody } from "../../../types/expressTypes.js";
import { ReqQuery } from "../../../types/queryTypes.js";
import { queryFormater } from "../../../utils/queryFormater.js";
import { zParse } from "../../../utils/zParse.js";
import {
  createSchema,
  deleteManySchema,
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
    const foundLists = await listsServices.findAll(query);

    res.status(200).json(foundLists);
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
    const { query, body } = await zParse(
      createSchema.extend({ body: list }),
      req,
    );
    const createdList = await listsServices.create(body, query.deep);

    res.status(201).json(createdList);
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
    const foundList = await listsServices.findOne(params.id, query.deep);

    res.status(200).json(foundList);
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
    const { query, params, body } = await zParse(
      updateSchema.extend({ body: updateList }),
      req,
    );
    const updatedList = await listsServices.update(params.id, query.deep, body);

    res.status(200).json(updatedList);
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
    const { query, params } = await zParse(deleteSchema, req);

    const deletedList = await listsServices.deleteOne(params.id, query.deep);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteMany = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = await zParse(deleteManySchema, req);

    const deletedLists = await listsServices.deleteMany(
      body.ids,
      body.deleteAll,
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
