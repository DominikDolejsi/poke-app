import { Router } from "express";
import * as listsController from "./lists.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { List, updateList } from "./lists.model.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";
import { IdList } from "../../../types/IdList.js";

const router = Router();

router
  .route("/")
  .get(listsController.getAll)
  .post(validateRequest({ body: List }), listsController.create)
  .delete(validateRequest({ body: IdList }), listsController.deleteMany);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), listsController.getOne)
  .patch(
    validateRequest({ params: ParamsWithId, body: updateList }),
    listsController.update,
  )
  .delete(validateRequest({ params: ParamsWithId }), listsController.deleteOne);

export default router;
