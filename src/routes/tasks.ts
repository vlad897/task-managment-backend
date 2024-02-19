import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation_middleware.js";
import { adding_task_scheme } from "../validations/tasks.js";
const router = Router();

router.post("/", validationMiddleware(adding_task_scheme), (req, res) => {
  console.log(req.body);

  res.send({ ok: "ok" });
});

export default router;
