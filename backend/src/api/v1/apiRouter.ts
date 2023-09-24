import { Router } from "express";
import usersRouter from "./users/users.routes.js";
import gamesRouter from "./games/games.routes.js";
import pokemonsRouter from "./pokemons/pokemons.routes.js";
import pokemonTypesRouter from "./pokemon_types/pokemonTypes.routes.js";
import pokemonFormsRouter from "./pokemon_forms/pokemonForms.routes.js";
import listsRouter from "./lists/lists.routes.js";
import listEntitiesRouter from "./list_entities/listEntities.routes.js";
import formTypesRouter from "./form_types/formTypes.routes.js";
import { authorizeUser, verifyJWT } from "../../middlewares.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World from API",
  });
});

router.use("/games", gamesRouter);
router.use("/pokemons", pokemonsRouter);
router.use("/pokemontypes", pokemonTypesRouter);
router.use("/pokemonforms", pokemonFormsRouter);
router.use("/listentities", listEntitiesRouter);
router.use("/lists", listsRouter);
router.use("/formtypes", formTypesRouter);

router.use(verifyJWT);
router.use(authorizeUser);
router.use("/users", usersRouter);

export default router;
