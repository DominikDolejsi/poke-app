import { Router } from "express";
import * as listsController from "./lists.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { List, updateList } from "./lists.model.js";
import { paramsWithId } from "../../../types/paramsWithId.js";
import { IdList } from "../../../types/idList.js";

const router = Router();

router
  .route("/")
  .get(listsController.getAll)
  .post(validateRequest({ body: List }), listsController.create)
  .delete(validateRequest({ body: IdList }), listsController.deleteMany);

router
  .route("/:id")
  .get(validateRequest({ params: paramsWithId }), listsController.getOne)
  .patch(
    validateRequest({ params: paramsWithId, body: updateList }),
    listsController.update,
  )
  .delete(validateRequest({ params: paramsWithId }), listsController.deleteOne);

export default router;
