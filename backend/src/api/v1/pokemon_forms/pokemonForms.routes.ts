import { Router } from "express";
import * as pokemonFormsController from "./pokemonForms.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { PokemonForm, updatePokemonForm } from "./pokemonForms.model.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(pokemonFormsController.getAll)
  .post(validateRequest({ body: PokemonForm }), pokemonFormsController.create);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), pokemonFormsController.getOne)
  .patch(
    validateRequest({ params: ParamsWithId, body: updatePokemonForm }),
    pokemonFormsController.update,
  )
  .delete(
    validateRequest({ params: ParamsWithId }),
    pokemonFormsController.deleteOne,
  );

export default router;
