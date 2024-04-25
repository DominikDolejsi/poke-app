import { Router } from "express";
import * as formTypesController from "./formTypes.controllers.js";

const router = Router();

router
  .route("/")
  .get(formTypesController.getAll)
  .post(formTypesController.create);

router
  .route("/:id")
  .get(formTypesController.getOne)
  .patch(formTypesController.update)
  .delete(formTypesController.deleteOne);

export default router;
