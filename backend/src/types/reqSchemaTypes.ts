import z from "zod";
import { reqQuerySchema } from "./queryTypes.js";
import { paramsId } from "./paramsTypes.js";

export const getAllSchema = z.object({
    query: reqQuerySchema
})

export const getOneSchema = z.object({
    query: reqQuerySchema,
    params: paramsId
})

export const createSchema = z.object({
    query: reqQuerySchema,
})

export const updateSchema = z.object({
    query: reqQuerySchema,
    params: paramsId,
})

export const deleteSchema = z.object({
    query: reqQuerySchema,
    params: paramsId
})