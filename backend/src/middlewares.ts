import { Request, Response, NextFunction } from "express";
import errorResponse from "./types/errorResponse.js";
import notFoundResponse from "./types/notFoundResponse.js";
import { ZodError } from "zod";
import RequestValidators from "./types/RequestValidators.js";
import { User } from "./api/v1/users/users.model.js";
import bcrypt from "bcrypt";

export const authorizeUser = async (
  req: Request<object, object, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

export const hashPassword = async (
  req: Request<object, object, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
};

export const handleError = (
  err: Error,
  req: Request,
  res: Response<errorResponse>,
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "REDACTED" : err.stack,
  });
};

export const handleNotFound = (
  req: Request,
  res: Response<notFoundResponse>,
  next: NextFunction,
) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({
      error: "404 - Resource not found",
    });
  } else {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
  }
};
