import { Router } from "express";
import * as gamesController from "./games.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { Game } from "./games.model.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(gamesController.getAll)
  .post(validateRequest({ body: Game }), gamesController.create);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), gamesController.getOne)
  .patch(
    validateRequest({ params: ParamsWithId, body: Game }),
    gamesController.update,
  )
  .delete(validateRequest({ params: ParamsWithId }), gamesController.deleteOne);

export default router;
