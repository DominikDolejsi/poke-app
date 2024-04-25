import { Router } from "express";
import * as gamesController from "./games.controllers.js";

const router = Router();

router.route("/").get(gamesController.getAll).post(gamesController.create);

router
  .route("/:id")
  .get(gamesController.getOne)
  .patch(gamesController.update)
  .delete(gamesController.deleteOne);

export default router;
