import { Router } from "express";
import { User } from "../api/v1/users/users.model.js";
import { LoginCredentials } from "../types/loginCredentials.js";
import { hashPassword, validateRequest } from "../middlewares.js";
import * as authController from "./auth.controller.js";
import { JwtToken } from "../types/jwtToken.js";

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

export default router;
