import { Request, Response, NextFunction } from "express";
import * as userServices from "../api/v1/users/users.services.js";
import * as authServices from "./auth.services.js";
import { LoginCredentials } from "./auth.model.js";
import { User } from "../api/v1/users/users.model.js";

export const register = async (
  req: Request<object, object, User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await userServices.create(req.body);
    res.status(201).json(newUser);
    // Email verification in the future
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<object, object, LoginCredentials>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const foundUser = await authServices.authenticateUser(req.body);
    const accessToken = authServices.createAccessToken(foundUser.id);
    const refreshToken = authServices.createRefreshToken(foundUser.id);
    await authServices.saveRefreshToken(foundUser.id, refreshToken);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies?.jwt) throw new Error("No refresh token provided");
    const accessToken = authServices.verifyRefreshToken(req.cookies.jwt);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
