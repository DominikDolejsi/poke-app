import { Request, Response, NextFunction } from "express";
import {
  PokemonFormDB,
  PokemonForm,
  updatePokemonForm,
} from "./pokemonForms.model.js";
import * as pokemonFormsServices from "./pokemonForms.services.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const foundPokemonForms = await pokemonFormsServices.findAll();
    res.status(200).json(foundPokemonForms);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request<Record<string, never>, PokemonFormDB, PokemonForm>,
  res: Response<PokemonFormDB>,
  next: NextFunction,
) => {
  try {
    const createdPokemonForm = await pokemonFormsServices.create(req.body);
    res.status(201).json(createdPokemonForm);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request<ParamsWithId, PokemonFormDB>,
  res: Response<PokemonFormDB>,
  next: NextFunction,
) => {
  try {
    const foundPokemonForm = await pokemonFormsServices.findOne(
      Number(req.params.id),
    );
    res.status(200).json(foundPokemonForm);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request<ParamsWithId, PokemonFormDB, updatePokemonForm>,
  res: Response<PokemonFormDB>,
  next: NextFunction,
) => {
  try {
    const updatedPokemonForm = await pokemonFormsServices.update(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(updatedPokemonForm);
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
    const deletedPokemonForm = await pokemonFormsServices.deleteOne(
      Number(req.params.id),
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
