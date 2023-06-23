import { Router } from "express";
import * as usersController from "./users.controllers.js";

import { validateRequest, hashPassword} from "../../../middlewares.js";
import { User } from "./users.model.js";
import { ParamsWithUuid } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(usersController.getAll)
  .post(validateRequest({ body: User }), hashPassword, usersController.create);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithUuid }), usersController.getOne)
  .patch(
    validateRequest({ params: ParamsWithUuid, body: User }),
    hashPassword,
    usersController.update,
  )
  .delete(
    validateRequest({ params: ParamsWithUuid }),
    usersController.deleteOne,
  );

export default router;
