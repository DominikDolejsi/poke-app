import { Request, Response, NextFunction } from "express";
import errorResponse from "./types/errorResponse.js";
import notFoundResponse from "./types/notFoundResponse.js";
import { ZodError } from "zod";
import RequestValidators from "./types/RequestValidators.js";
import { User, Users } from "./api/v1/users/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accessToken } from "./types/accessToken.js";
import { LoginCredentials } from "./auth/auth.model.js";

export const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check acces Token
    // Find user in DB and find if he is Admin
    if (!process.env.ACCESS_TOKEN_SECRET)
      throw new Error("Secret for access token missing");
    if (!req.headers.authorization) throw new Error("No signature");
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No signature");
    const userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (userId) throw new Error("No payload");
    const foundUser = await Users.findUniqueOrThrow({ where: { id: userId } });
    if (!foundUser.admin) throw new Error("Unauthorized access")
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyJWT = async (
  req: Request<object, object, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check acces Token
    if (!process.env.ACCESS_TOKEN_SECRET)
      throw new Error("Secret for access token missing");
    if (!req.headers.authorization) throw new Error("No signature");
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No signature");
    const userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (userId) throw new Error("No payload");
    const foundUser = await Users.findUniqueOrThrow({ where: { id: userId } });
    next();
  } catch (error) {
    next(error);
  }
};

export const hashPassword = async (
  req: Request<object, object, User | LoginCredentials>,
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
  if (err instanceof ZodError) {
    res.status(statusCode).send(err);
  } else {
    res.status(statusCode).json({ message: err.message }); // This is here just for now, error handling adn formating still needs revision and testing
    // res.status(statusCode).json({
    //   message: err.message,
    //   stack: process.env.NODE_ENV === "production" ? "REDACTED" : err.stack,
    // });
  }
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
