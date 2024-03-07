import { Router } from "express";
import * as listEntitiesController from "./listEntities.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { ListEntity, updateListEntity } from "./listEntities.model.js";
import { paramsWithId } from "../../../types/paramsWithId.js";
import { IdList } from "../../../types/idList.js";

const router = Router();

router
  .route("/")
  .get(listEntitiesController.getAll)
  .post(validateRequest({ body: ListEntity }), listEntitiesController.create)
  .delete(validateRequest({ body: IdList }), listEntitiesController.deleteMany);

router
  .route("/:id")
  .get(validateRequest({ params: paramsWithId }), listEntitiesController.getOne)
  .patch(
    validateRequest({ params: paramsWithId, body: updateListEntity }),
    listEntitiesController.update,
  )
  .delete(validateRequest({ params: paramsWithId }), listEntitiesController.deleteOne);

export default router;
