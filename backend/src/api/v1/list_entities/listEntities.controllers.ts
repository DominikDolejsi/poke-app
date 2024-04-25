import { Request, Response, NextFunction } from "express";
import { ListEntity, updateListEntity } from "./listEntities.model.js";
import * as listEntitiesServices from "./listEntities.services.js";
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

    const foundListEntities = await listEntitiesServices.findAll(query);
    res.status(200).json(foundListEntities);
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
      createSchema.extend({ body: ListEntity }),
      req,
    );

    const createdListEntity = await listEntitiesServices.create(
      body,
      query.deep,
    );
    res.status(201).json(createdListEntity);
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
    const { query, params } = await zParse(getOneSchema, req);

    const foundListEntity = await listEntitiesServices.findOne(
      params.id,
      query.deep,
    );
    res.status(200).json(foundListEntity);
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
      updateSchema.extend({ body: updateListEntity }),
      req,
    );

    const updatedListEntity = await listEntitiesServices.update(
      params.id,
      body,
      query.deep,
    );
    res.status(200).json(updatedListEntity);
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

    const deletedListEntity = await listEntitiesServices.deleteOne(params.id);
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

    const deletedListEntities = await listEntitiesServices.deleteMany(
      body.ids,
      body.deleteAll,
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
