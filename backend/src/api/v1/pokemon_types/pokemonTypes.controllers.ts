import { Request, Response, NextFunction } from "express";
import { pokemonType, updatePokemonType } from "./pokemonTypes.model.js";
import * as pokemonTypesServices from "./pokemonTypes.services.js";
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

    const foundPokemonTypes = await pokemonTypesServices.findAll(query);
    res.status(200).json(foundPokemonTypes);
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
      createSchema.extend({ body: pokemonType }),
      req,
    );

    const createdPokemonType = await pokemonTypesServices.create(
      body,
      query.deep,
    );
    res.status(201).json(createdPokemonType);
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

    const foundPokemonType = await pokemonTypesServices.findOne(
      params.id,
      query.deep,
    );
    res.status(200).json(foundPokemonType);
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
      updateSchema.extend({ body: updatePokemonType }),
      req,
    );

    const updatedPokemonType = await pokemonTypesServices.update(
      params.id,
      body,
      query.deep,
    );
    res.status(200).json(updatedPokemonType);
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

    const deletedPokemonType = await pokemonTypesServices.deleteOne(
      params.id,
      query.deep,
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
