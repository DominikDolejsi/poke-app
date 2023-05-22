import { Request, Response, NextFunction } from "express";
import errorResponse from "./types/errorResponse.js";
import notFoundResponse from "./types/notFoundResponse.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<errorResponse>,
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "REDACTED" : err.stack,
  });
};

export const notFoundHandler = (
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
