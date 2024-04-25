import { Request, Response, NextFunction } from "express";
import { pokemon, updatePokemon } from "./pokemons.model.js";
import * as pokemonsServices from "./pokemons.services.js";
import { zParse } from "../../../utils/zParse.js";
import {
  createSchema,
  deleteSchema,
  getAllSchema,
  pokemonGetOneSchema,
  updateSchema,
} from "../../../types/reqSchemaTypes.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = await zParse(getAllSchema, req);

    const foundPokemons = await pokemonsServices.findAll(query);
    res.status(200).json(foundPokemons);
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
      createSchema.extend({ body: pokemon }),
      req,
    );

    const createdPokemon = await pokemonsServices.create(body, query.deep);
    res.status(201).json(createdPokemon);
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
    const { query, params } = await zParse(pokemonGetOneSchema, req);

    const foundPokemon = await pokemonsServices.findOne(params.id, query);
    res.status(200).json(foundPokemon);
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
      updateSchema.extend({ body: updatePokemon }),
      req,
    );

    const updatedPokemon = await pokemonsServices.update(
      params.id,
      body,
      query.deep,
    );
    res.status(200).json(updatedPokemon);
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

    const deletedPokemon = await pokemonsServices.deleteOne(
      params.id,
      query.deep,
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
