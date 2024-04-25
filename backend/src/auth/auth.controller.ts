import { Request, Response, NextFunction } from "express";
import * as userServices from "../api/v1/users/users.services.js";
import * as authServices from "./auth.services.js";
import { user } from "../api/v1/users/users.model.js";
import {
  createSchema,
  loginSchema,
  refreshSchema,
} from "../types/reqSchemaTypes.js";
import { zParse } from "../utils/zParse.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body, query } = await zParse(
      createSchema.extend({ body: user }),
      req,
    );

    const newUser = await userServices.create(body, query.deep);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = await zParse(loginSchema, req);

    const foundUser = await authServices.authenticateUser(body.email);
    await authServices.checkPassword(foundUser, body.password);
    const accessToken = authServices.createAccessToken(foundUser.id);
    const refreshToken = authServices.createRefreshToken(foundUser.id);
    await authServices.saveRefreshToken(foundUser.id, refreshToken);

    const ONE_DAY = 24 * 60 * 60 * 1000;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: ONE_DAY,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cookies } = await zParse(refreshSchema, req);

    const accessToken = await authServices.verifyRefreshToken(cookies.jwt);

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
