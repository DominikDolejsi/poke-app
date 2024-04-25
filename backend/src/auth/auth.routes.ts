import { Router } from "express";
import { hashPassword } from "../middlewares.js";
import * as authController from "./auth.controller.js";

const router = Router();

router
  .route("/register")
  .post(hashPassword, authController.register);

router
  .route("/login")
  .post(authController.login);

router
  .route("/refresh")
  .get(authController.refresh);

export default router;
