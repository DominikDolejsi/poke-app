import { Request, Response, NextFunction } from "express";
import { PokemonDB, Pokemon, updatePokemon } from "./pokemons.model.js";
import * as pokemonsServices from "./pokemons.services.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";
import { EmptyBody, EmptyParams } from "../../../types/ExpressTypes.js";
import { queryFormater } from "../../../utils/queryFormater.js";
import { ReqQuery } from "../../../types/QueryTypes.js";

export const getAll = async (
  req: Request<EmptyParams, EmptyBody, EmptyBody, ReqQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqQuery = queryFormater(req.query);
    const foundPokemons = await pokemonsServices.findAll(reqQuery);
    res.status(200).json(foundPokemons);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<Record<string, never>, PokemonDB, Pokemon>,
  res: Response<PokemonDB>,
  next: NextFunction,
) => {
  try {
    const createdPokemon = await pokemonsServices.create(req.body);
    res.status(201).json(createdPokemon);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithId, PokemonDB, EmptyBody, ReqQuery>,
  res: Response<PokemonDB>,
  next: NextFunction,
) => {
  try {
    const reqQuery = queryFormater(req.query);
    const foundPokemon = await pokemonsServices.findOne(
      Number(req.params.id),
      reqQuery,
    );
    res.status(200).json(foundPokemon);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithId, PokemonDB, updatePokemon>,
  res: Response<PokemonDB>,
  next: NextFunction,
) => {
  try {
    const updatedPokemon = await pokemonsServices.update(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(updatedPokemon);
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
    const deletedPokemon = await pokemonsServices.deleteOne(
      Number(req.params.id),
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
