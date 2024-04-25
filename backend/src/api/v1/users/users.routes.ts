import { Router } from "express";
import * as usersController from "./users.controllers.js";
import { hashPassword } from "../../../middlewares.js";

const router = Router();

router
  .route("/")
  .get(usersController.getAll)
  .post(hashPassword, usersController.create);

router
  .route("/:id")
  .get(usersController.getOne)
  .patch(hashPassword, usersController.update)
  .delete(usersController.deleteOne);

export default router;
