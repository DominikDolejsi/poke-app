import { Router } from "express";
import * as pokemonsController from "./pokemons.controllers.js";

const router = Router();

router
  .route("/")
  .get(pokemonsController.getAll)
  .post(pokemonsController.create);

router
  .route("/:id")
  .get(pokemonsController.getOne)
  .patch(pokemonsController.update)
  .delete(pokemonsController.deleteOne);

export default router;
