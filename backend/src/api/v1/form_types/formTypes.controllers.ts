import { Request, Response, NextFunction } from "express";
import { formType, updateFormType } from "./formTypes.model.js";
import * as formTypesServices from "./formTypes.services.js";
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

    const foundFormTypes = await formTypesServices.findAll(query);
    res.status(200).json(foundFormTypes);
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
      createSchema.extend({ body: formType }),
      req,
    );

    const createdFormType = await formTypesServices.create(body, query.deep);
    res.status(201).json(createdFormType);
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

    const foundFormType = await formTypesServices.findOne(
      params.id,
      query.deep,
    );
    res.status(200).json(foundFormType);
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
      updateSchema.extend({ body: updateFormType }),
      req,
    );

    const updatedFormType = await formTypesServices.update(
      params.id,
      body,
      query.deep,
    );
    res.status(200).json(updatedFormType);
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

    const deletedFormType = await formTypesServices.deleteOne(params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
