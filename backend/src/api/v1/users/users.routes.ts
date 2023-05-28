import { Router } from "express";
import * as usersController from "./users.controllers.js";

const router = Router();

router.route("/").get(usersController.getAll).post(usersController.create);

router
  .route("/:id")
  .get(usersController.getOne)
  .patch(usersController.update)
  .delete(usersController.deleteOne);

export default router;
