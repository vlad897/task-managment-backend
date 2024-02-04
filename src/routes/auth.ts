import { Router } from "express";
import { registration_validation_scheme } from "../validations/auth.js";
import { validationMiddleware } from "../middlewares/validation_middleware.js";
import { createUser } from "../controllers/auth.js";

const router = Router();

router.post("/registration", validationMiddleware(registration_validation_scheme), createUser);

export default router;
