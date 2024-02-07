import { Router } from "express";
import {
  login_validation_scheme,
  new_password_validation_scheme,
  recover_account_secret_code_validation_scheme,
  recover_account_validation_scheme,
  registration_validation_scheme
} from "../validations/auth.js";
import { validationMiddleware } from "../middlewares/validation_middleware.js";
import { checkingUserExistence, checkingUserSendCode, createUser, findUser, updateUserPassword } from "../controllers/auth.js";

const router = Router();

router.post("/registration", validationMiddleware(registration_validation_scheme), createUser);

router.post("/login", validationMiddleware(login_validation_scheme), findUser);

router.post("/recover_account", validationMiddleware(recover_account_validation_scheme), checkingUserExistence);

router.post("/recover_account_code", validationMiddleware(recover_account_secret_code_validation_scheme), checkingUserSendCode);

router.post("/recover_account_password", validationMiddleware(new_password_validation_scheme), updateUserPassword);

export default router;
