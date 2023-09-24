import { Router } from "express";
import * as listEntitiesController from "./listEntities.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { ListEntity, updateListEntity } from "./listEntities.model.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";
import { IdList } from "../../../types/IdList.js";

const router = Router();

router
  .route("/")
  .get(listEntitiesController.getAll)
  .post(validateRequest({ body: ListEntity }), listEntitiesController.create)
  .delete(validateRequest({ body: IdList }), listEntitiesController.deleteMany);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), listEntitiesController.getOne)
  .patch(
    validateRequest({ params: ParamsWithId, body: updateListEntity }),
    listEntitiesController.update,
  )
  .delete(validateRequest({ params: ParamsWithId }), listEntitiesController.deleteOne);

export default router;
