import { Router } from "express";
import * as listEntitiesController from "./listEntities.controllers.js";

const router = Router();

router
  .route("/")
  .get(listEntitiesController.getAll)
  .post(listEntitiesController.create)
  .delete(listEntitiesController.deleteMany);

router
  .route("/:id")
  .get(listEntitiesController.getOne)
  .patch(listEntitiesController.update)
  .delete(listEntitiesController.deleteOne);

export default router;
