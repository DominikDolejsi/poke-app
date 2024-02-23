import { Request, Response, NextFunction } from "express";
import * as userServices from "../api/v1/users/users.services.js";
import * as authServices from "./auth.services.js";
import { LoginCredentials } from "../types/LoginCredentials.js";
import { User, UserDB } from "../api/v1/users/users.model.js";
import { AccessToken } from "../types/AccessToken.js";
import { ParamsWithJWT } from "../types/paramsWIthJWT.js";
import { EmptyBody, EmptyParams } from "../types/ExpressTypes.js";

export const register = async (
  req: Request<EmptyParams, EmptyBody, User>,
  res: Response<UserDB>,
  next: NextFunction,
) => {
  try {
    const newUser = await userServices.create(req.body);
    // The email verification is now disabled couz I dont udnerstand it.
    // const emailToken = authServices.createEmailToken(newUser.id);
    // const updatedUser = await userServices.update(newUser.id, { emailToken });



    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<EmptyParams, EmptyBody, LoginCredentials>,
  res: Response<AccessToken>,
  next: NextFunction,
) => {
  try {
    const foundUser = await authServices.authenticateUser(req.body);
    await authServices.checkPassword(foundUser, req.body.password);
    await authServices.checkEmail(foundUser);
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
    const accessToken = await authServices.verifyRefreshToken(req.cookies.jwt);

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const verfiyEmail = async (
  req: Request<ParamsWithJWT>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authServices.verifyEmailToken(req.params.token);

    res.redirect("https://www.google.com");
  } catch (error) {
    next(error);
  }
};
