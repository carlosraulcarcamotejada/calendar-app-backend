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
    check("name", "El nombre es obligatorio.")
      .not()
      .isEmpty()
      .withMessage("Nombre es requerido.")
      .isLength({ min: 3 })
      .withMessage("Mínimo 3 caracteres.")
      .isLength({ max: 40 })
      .withMessage("Máximo 40 caracteres.")
      .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi)
      .withMessage("Sólo se permiten letras para el nombre."),
    check("lastname", "El Apellido es obligatorio.")
      .not()
      .isEmpty()
      .withMessage("Apellido es requerido.")
      .isLength({ min: 3 })
      .withMessage("Mínimo 3 caracteres.")
      .isLength({ max: 40 })
      .withMessage("Máximo 40 caracteres.")
      .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi)
      .withMessage("Sólo se permiten letras para el apellido."),
    check("email", "Correo es requerido.")
      .not()
      .isEmpty()
      .withMessage("Correo es requerido.")
      .isEmail()
      .withMessage("Debe ser un email válido."),
    check("password", "El password es obligatorio.")
      .not()
      .isEmpty()
      .withMessage("Contraseña es requerida.")
      .isLength({ min: 8 })
      .withMessage("Mínimo 8 caracteres.")
      .isLength({ max: 12 })
      .withMessage("Máximo 12 caracteres.")
      .matches(/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/)
      .withMessage("Debe contener al menos un caracter especial.")

      .matches(/^(?=.*[A-Z])/)
      .withMessage("Debe contener al menos un carácter en mayúscula.")

      .matches(/^(?=.*[a-z])/)
      .withMessage("Debe contener al menos un carácter en Minúscula.")

      .matches(/^(?=.*[0-9])/)
      .withMessage("Debe contener al menos un número.")
      ,
    validateFields,
  ],
  signUp
);

routerAuth.post("/", login);

routerAuth.get("/renew", validateJwt, revalidateToken);

export { routerAuth };
