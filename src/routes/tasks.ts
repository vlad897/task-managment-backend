import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation_middleware.js";
import { adding_task_scheme } from "../validations/tasks.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
const router = Router();

router.post("/", validationMiddleware(adding_task_scheme), authMiddleware, (req, res) => {
  res.send({ ok: "ok" });
});

export default router;
