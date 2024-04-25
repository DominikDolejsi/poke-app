import { Router } from "express";
import * as pokemonFormsController from "./pokemonForms.controllers.js";

const router = Router();

router
  .route("/")
  .get(pokemonFormsController.getAll)
  .post(pokemonFormsController.create);

router
  .route("/:id")
  .get(pokemonFormsController.getOne)
  .patch(pokemonFormsController.update)
  .delete(pokemonFormsController.deleteOne);

export default router;
