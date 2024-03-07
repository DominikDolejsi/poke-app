import { Router } from "express";
import * as usersController from "./users.controllers.js";

import { validateRequest, hashPassword} from "../../../middlewares.js";
import { User, updateUser } from "./users.model.js";
import { paramsWithUuid } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(usersController.getAll)
  .post(validateRequest({ body: User }), hashPassword, usersController.create);

router
  .route("/:id")
  .get(validateRequest({ params: paramsWithUuid }), usersController.getOne)
  .patch(
    validateRequest({ params: paramsWithUuid, body: updateUser }),
    hashPassword,
    usersController.update,
  )
  .delete(
    validateRequest({ params: paramsWithUuid }),
    usersController.deleteOne,
  );

export default router;
