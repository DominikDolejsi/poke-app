import { Request, Response, NextFunction } from "express";
import {
  PokemonType,
  PokemonTypeDB,
  updatePokemonType,
} from "./pokemonTypes.model.js";
import * as pokemonTypesServices from "./pokemonTypes.services.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const foundPokemonTypes = await pokemonTypesServices.findAll();
    res.status(200).json(foundPokemonTypes);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<Record<string, never>, PokemonTypeDB, PokemonType>,
  res: Response<PokemonTypeDB>,
  next: NextFunction,
) => {
  try {
    const createdPokemonType = await pokemonTypesServices.create(req.body);
    res.status(201).json(createdPokemonType);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithId, PokemonTypeDB>,
  res: Response<PokemonTypeDB>,
  next: NextFunction,
) => {
  try {
    const foundPokemonType = await pokemonTypesServices.findOne(
      Number(req.params.id),
    );
    res.status(200).json(foundPokemonType);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithId, PokemonTypeDB, updatePokemonType>,
  res: Response<PokemonTypeDB>,
  next: NextFunction,
) => {
  try {
    const updatedPokemonType = await pokemonTypesServices.update(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(updatedPokemonType);
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
    const deletedPokemonType = await pokemonTypesServices.deleteOne(
      Number(req.params.id),
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
