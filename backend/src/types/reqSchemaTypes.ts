import z from "zod";
import {
  manyQuerySchema,
  oneQuerySchema,
  pokemonOneQuerySchema,
} from "./queryTypes.js";
import { paramsId } from "./paramsTypes.js";
import { deleteManyBodySchema } from "./bodyTypes.js";

export const getAllSchema = z.object({
  query: manyQuerySchema,
});

export const getOneSchema = z.object({
  query: oneQuerySchema,
  params: paramsId,
});

export const pokemonGetOneSchema = z.object({
  query: pokemonOneQuerySchema,
  params: paramsId,
});

export const createSchema = z.object({
  query: oneQuerySchema,
});

export const updateSchema = z.object({
  query: oneQuerySchema,
  params: paramsId,
});

export const deleteSchema = z.object({
  query: oneQuerySchema,
  params: paramsId,
});

export const deleteManySchema = z.object({
  body: deleteManyBodySchema,
});
