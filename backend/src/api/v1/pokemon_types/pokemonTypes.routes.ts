import { Router } from "express";
import * as pokemonTypesController from "./pokemonTypes.controllers.js";

const router = Router();

router
  .route("/")
  .get(pokemonTypesController.getAll)
  .post(pokemonTypesController.create);

router
  .route("/:id")
  .get(pokemonTypesController.getOne)
  .patch(pokemonTypesController.update)
  .delete(pokemonTypesController.deleteOne);

export default router;
