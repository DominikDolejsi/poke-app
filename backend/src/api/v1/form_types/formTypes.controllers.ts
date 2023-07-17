import { Request, Response, NextFunction } from "express";
import { FormType, FormTypeDB } from "./formTypes.model.js";
import * as formTypesServices from "./formTypes.services.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const foundFormTypes = await formTypesServices.findAll();
    res.status(200).json(foundFormTypes);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<Record<string, never>, FormTypeDB, FormType>,
  res: Response<FormTypeDB>,
  next: NextFunction,
) => {
  try {
    const createdFormType = await formTypesServices.create(req.body);
    res.status(201).json(createdFormType);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithId, FormTypeDB>,
  res: Response<FormTypeDB>,
  next: NextFunction,
) => {
  try {
    const foundFormType = await formTypesServices.findOne(Number(req.params.id));
    res.status(200).json(foundFormType);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithId, FormTypeDB, FormType>,
  res: Response<FormTypeDB>,
  next: NextFunction,
) => {
  try {
    const updatedFormType = await formTypesServices.update(Number(req.params.id), req.body);
    res.status(200).json(updatedFormType);
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
    const deletedFormType = await formTypesServices.deleteOne(Number(req.params.id));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
