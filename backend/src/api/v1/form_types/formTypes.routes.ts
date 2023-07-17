import { Router } from "express";
import * as formTypesController from "./formTypes.controller.js";

import { validateRequest } from "../../../middlewares.js";
import { FormType } from "./formTypes.model.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(formTypesController.getAll)
  .post(validateRequest({ body: FormType }), formTypesController.create);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), formTypesController.getOne)
  .patch(
    validateRequest({ params: ParamsWithId, body: FormType }),
    formTypesController.update,
  )
  .delete(validateRequest({ params: ParamsWithId }), formTypesController.deleteOne);

export default router;