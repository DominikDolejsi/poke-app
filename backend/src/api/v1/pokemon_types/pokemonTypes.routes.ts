import { Router } from "express";
import * as pokemonTypesController from "./pokemonTypes.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { PokemonType, updatePokemonType } from "./pokemonTypes.model.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(pokemonTypesController.getAll)
  .post(validateRequest({ body: PokemonType }), pokemonTypesController.create);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), pokemonTypesController.getOne)
  .patch(
    validateRequest({ params: ParamsWithId, body: updatePokemonType }),
    pokemonTypesController.update,
  )
  .delete(
    validateRequest({ params: ParamsWithId }),
    pokemonTypesController.deleteOne,
  );

export default router;
