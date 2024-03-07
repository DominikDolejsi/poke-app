import { Router } from "express";
import * as pokemonFormsController from "./pokemonForms.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { PokemonForm, updatePokemonForm } from "./pokemonForms.model.js";
import { paramsWithId } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(pokemonFormsController.getAll)
  .post(validateRequest({ body: PokemonForm }), pokemonFormsController.create);

router
  .route("/:id")
  .get(validateRequest({ params: paramsWithId }), pokemonFormsController.getOne)
  .patch(
    validateRequest({ params: paramsWithId, body: updatePokemonForm }),
    pokemonFormsController.update,
  )
  .delete(
    validateRequest({ params: paramsWithId }),
    pokemonFormsController.deleteOne,
  );

export default router;
