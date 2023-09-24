import { Router } from "express";
import * as pokemonsController from "./pokemons.controllers.js";

import { validateRequest } from "../../../middlewares.js";
import { Pokemon, updatePokemon } from "./pokemons.model.js";
import { ParamsWithId } from "../../../types/paramsWithId.js";

const router = Router();

router
  .route("/")
  .get(pokemonsController.getAll)
  .post(validateRequest({ body: Pokemon }), pokemonsController.create);

router
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), pokemonsController.getOne)
  .patch(
    validateRequest({ params: ParamsWithId, body: updatePokemon }),
    pokemonsController.update,
  )
  .delete(
    validateRequest({ params: ParamsWithId }),
    pokemonsController.deleteOne,
  );

export default router;
