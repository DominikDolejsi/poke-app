import { Router } from "express";
import usersRouter from "./users/users.routes.js";
import { authorizeUser } from "../../middlewares.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World from API",
  });
});

router.use(authorizeUser);
router.use("/users", usersRouter);

export default router;
