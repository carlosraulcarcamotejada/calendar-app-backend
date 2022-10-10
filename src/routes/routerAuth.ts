/*
 User's routes /auth
 host + /api/auth
*/

import { Router } from "express";
import { signUp, login, revalidateToken } from "../controllers/authControllers";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { validateJwt } from "../middlewares/validateJwt";

const routerAuth = Router();

routerAuth.post(
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

routerAuth.post(
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

routerAuth.get("/renew", validateJwt, revalidateToken);

export { routerAuth };
