import jwt from "jsonwebtoken";
import { UserDB, Users } from "../api/v1/users/users.model.js";
import "dotenv/config";
import { LoginCredentials } from "../types/LoginCredentials.js";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authenticateUser = async (loginCredentials: LoginCredentials) => {
  const foundUser = await Users.findUniqueOrThrow({
    where: {
      email: loginCredentials.email,
    },
  });
  return foundUser;
};

export const createAccessToken = (id: string) => {
  if (!process.env.ACCESS_TOKEN_SECRET)
    throw new Error("Secret for access token missing");
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

export const createRefreshToken = (id: string) => {
  if (!process.env.REFRESH_TOKEN_SECRET)
    throw new Error("Secret for refresh token missing");
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return refreshToken;
};

export const saveRefreshToken = async (id: string, refreshToken: string) => {
  await Users.update({
    where: { id },
    data: { refreshToken },
  });
};

export const verifyRefreshToken = async (refreshToken: string) => {
  if (!process.env.REFRESH_TOKEN_SECRET)
    throw new Error("Secret for refresh token missing");

  const foundUser = await Users.findUniqueOrThrow({
    where: { refreshToken: refreshToken },
  });

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  ) as JwtPayload;

  if (decodedToken.id !== foundUser.id)
    throw new Error("Payload doesn't match");

  const accessToken = createAccessToken(foundUser.id);
  return accessToken;
};

export const checkPassword = async (user: UserDB, password: string) => {
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Incorrect password");
};
