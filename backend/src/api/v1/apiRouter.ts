import { Router } from "express";
import usersRouter from "./users/users.routes.js";
import gamesRouter from "./games/games.routes.js";
import { authorizeUser, verifyJWT } from "../../middlewares.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World from API",
  });
});

router.use("/games",gamesRouter)

router.use(verifyJWT);
router.use(authorizeUser);
router.use("/users", usersRouter);

export default router;
