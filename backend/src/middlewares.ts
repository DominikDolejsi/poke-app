import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./types/errorResponse.js";
import NotFoundResponse from "./types/notFoundResponse.js";
import { ZodError } from "zod";
import RequestValidators from "./types/requestValidators.js";
import { user, Users } from "./api/v1/users/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isAdmin = req.headers.admin;
    if (!isAdmin || isAdmin === "false") throw new Error("Unauthorzied access");
    next();
  } catch (error) {
    res.status(403);
    next(error);
  }
};

export const verifyJWT = async (
  req: Request<object, object, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET)
      throw new Error("Secret for access token missing");
    if (!req.headers.authorization) {
      res.status(400);
      throw new Error("No authorization header");
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(422);
      throw new Error("No signature");
    }
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    ) as JwtPayload;
    if (!decodedToken) {
      res.status(401);
      throw new Error("No payload");
    }
    const foundUser = await Users.findUniqueOrThrow({
      where: { id: decodedToken.id },
    });
    req.headers.admin = String(foundUser.admin);
    next();
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(422);
    }
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
      if (validators.cookie) {
        req.query = await validators.cookie.parseAsync(req.cookies);
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
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  if (err.name === "NotFoundError") {
    res.status(404).json({ message: "Not Found" });
  }
  if (err instanceof ZodError) {
    res.status(422).send(err);
  } else if (err instanceof PrismaClientKnownRequestError) {
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
  res: Response<NotFoundResponse>,
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

