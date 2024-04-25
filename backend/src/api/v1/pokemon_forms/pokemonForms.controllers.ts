import { Request, Response, NextFunction } from "express";
import { pokemonForm, updatePokemonForm } from "./pokemonForms.model.js";
import * as pokemonFormsServices from "./pokemonForms.services.js";
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

    const foundPokemonForms = await pokemonFormsServices.findAll(query);
    res.status(200).json(foundPokemonForms);
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
      createSchema.extend({ body: pokemonForm }),
      req,
    );

    const createdPokemonForm = await pokemonFormsServices.create(
      body,
      query.deep,
    );
    res.status(201).json(createdPokemonForm);
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

    const foundPokemonForm = await pokemonFormsServices.findOne(
      params.id,
      query.deep,
    );
    res.status(200).json(foundPokemonForm);
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
      updateSchema.extend({ body: updatePokemonForm }),
      req,
    );

    const updatedPokemonForm = await pokemonFormsServices.update(
      params.id,
      body,
      query.deep,
    );
    res.status(200).json(updatedPokemonForm);
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

    const deletedPokemonForm = await pokemonFormsServices.deleteOne(
      params.id,
      query.deep,
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
