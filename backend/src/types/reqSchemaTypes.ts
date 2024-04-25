import z from "zod";
import {
  manyQuerySchema,
  oneQuerySchema,
  pokemonOneQuerySchema,
} from "./queryTypes.js";
import { paramsId, paramsUuid } from "./paramsTypes.js";
import { LoginCredentials, deleteManyBodySchema } from "./bodyTypes.js";
import { user } from "../api/v1/users/users.model.js";
import { JwtToken } from "./cookieTypes.js";

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
  params: paramsId,
});

export const deleteManySchema = z.object({
  body: deleteManyBodySchema,
});

export const hashPasswordSchema = z.object({
  body: user.pick({
    password: true,
  }),
});

export const getOneUserSchema = z.object({
  query: oneQuerySchema,
  params: paramsUuid,
});

export const updateUserSchema = z.object({
  query: oneQuerySchema,
  params: paramsUuid,
});

export const deleteUserSchema = z.object({
  params: paramsUuid,
});

export const loginSchema = z.object({ body: LoginCredentials });

export const refreshSchema = z.object({ cookies: JwtToken });
