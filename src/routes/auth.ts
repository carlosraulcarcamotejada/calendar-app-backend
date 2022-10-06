/*
 User's routes /auth
 host + /api/auth
*/

import { Router } from "express";
import { signUp, login, revalidateToken } from "../controllers/auth";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { validateJwt } from "../middlewares/validateJwt";

const router = Router();

router.post(
  "/signup",
  [
    //Middlewares validators
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El email es obligatorio.").isEmail(),
    check("password", "El password es obligatorio.").isLength({
      min: 8,
      max: 12,
    }),
    validateFields,
  ],
  signUp
);

router.post(
  "/",
  [
    //Middlewares validators
    check("email", "El email es obligatorio.").isEmail(),
    check("password", "El password es obligatorio.").isLength({
      min: 8,
      max: 12,
    }),
    validateFields,
  ],
  login
);

router.get("/renew",validateJwt ,revalidateToken);

export default router;
