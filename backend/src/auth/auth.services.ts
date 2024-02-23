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
    include: { lists: true },
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

export const createEmailToken = (id: string) => {
  if (!process.env.EMAIL_TOKEN_SECRET)
    throw new Error("Secret for email token missing");
  const emailToken = jwt.sign({ id }, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return emailToken;
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

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  ) as JwtPayload;

  const foundUser = await Users.findUniqueOrThrow({
    where: { refreshToken: refreshToken },
  });

  if (decodedToken.id !== foundUser.id)
    throw new Error("Payload doesn't match");

  const accessToken = createAccessToken(foundUser.id);
  return accessToken;
};

export const checkPassword = async (user: UserDB, password: string) => {
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Incorrect password");
};

export const checkEmail = async (user: UserDB) => {
  if (user.emailToken) throw new Error("Email not verified");
};

export const verifyEmailToken = async (emailToken: string) => {
  if (!process.env.EMAIL_TOKEN_SECRET)
    throw new Error("Secret for email token missing");

  const decodedToken = jwt.verify(
    emailToken,
    process.env.EMAIL_TOKEN_SECRET,
  ) as JwtPayload;

  const foundUser = await Users.findUniqueOrThrow({
    where: { id: decodedToken.id },
  });

  if (decodedToken.id !== foundUser.id)
    throw new Error("Payload doesn't match");

  await Users.update({
    where: { id: decodedToken.id },
    data: { emailToken: null },
  });
};
