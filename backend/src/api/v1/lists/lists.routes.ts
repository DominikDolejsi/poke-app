import { Router } from "express";
import * as listsController from "./lists.controllers.js";

const router = Router();

router
  .route("/")
  .get(listsController.getAll)
  .post(listsController.create)
  .delete(listsController.deleteMany);

router
  .route("/:id")
  .get(listsController.getOne)
  .patch(listsController.update)
  .delete(listsController.deleteOne);

export default router;
