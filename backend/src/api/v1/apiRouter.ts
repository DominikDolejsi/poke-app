import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World from API",
  });
});

// router.use("users");

export default router;
