import { Router } from "express";
import { User } from "../api/v1/users/users.model.js";
import { LoginCredentials } from "../types/LoginCredentials.js";
import { hashPassword, validateRequest } from "../middlewares.js";
import * as authController from "./auth.controller.js";
import { JwtToken } from "../types/JwtToken.js";
import { ParamsWithJWT } from "../types/paramsWIthJWT.js";

const router = Router();

router
  .route("/register")
  .post(validateRequest({ body: User }), hashPassword, authController.register);

router
  .route("/login")
  .post(validateRequest({ body: LoginCredentials }), authController.login);

router
  .route("/refresh")
  .get(validateRequest({ cookie: JwtToken }), authController.refresh);

router
  .route("/verify")
  .get(validateRequest({ params: ParamsWithJWT }), authController.verfiyEmail);

export default router;
