import { Router } from "express";
import * as gamesController from "./games.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { game } from "./games.model.js";
import { paramsWithId } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(gamesController.getAll)
  .post(validateRequest({ body: game }), gamesController.create);

router
  .route("/:id")
  .get(validateRequest({ params: paramsWithId }), gamesController.getOne)
  .patch(
    validateRequest({ params: paramsWithId, body: game }),
    gamesController.update,
  )
  .delete(validateRequest({ params: paramsWithId }), gamesController.deleteOne);

export default router;
