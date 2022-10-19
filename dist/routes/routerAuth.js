"use strict";
/*
 User's routes /auth
 host + /api/auth
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const routerAuth = (0, express_1.Router)();
exports.routerAuth = routerAuth;
routerAuth.post("/signup", [
    //Middlewares validators
    (0, express_validator_1.check)("name", "El nombre es obligatorio.")
        .not()
        .isEmpty()
        .withMessage("Nombre es requerido.")
        .isLength({ min: 3 })
        .withMessage("Mínimo 3 caracteres.")
        .isLength({ max: 40 })
        .withMessage("Máximo 40 caracteres.")
        .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi)
        .withMessage("Sólo se permiten letras para el nombre."),
    (0, express_validator_1.check)("lastname", "El Apellido es obligatorio.")
        .not()
        .isEmpty()
        .withMessage("Apellido es requerido.")
        .isLength({ min: 3 })
        .withMessage("Mínimo 3 caracteres.")
        .isLength({ max: 40 })
        .withMessage("Máximo 40 caracteres.")
        .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi)
        .withMessage("Sólo se permiten letras para el apellido."),
    (0, express_validator_1.check)("email", "Correo es requerido.")
        .not()
        .isEmpty()
        .withMessage("Correo es requerido.")
        .isEmail()
        .withMessage("Debe ser un email válido."),
    (0, express_validator_1.check)("password", "El password es obligatorio.")
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
        .withMessage("Debe contener al menos un número."),
    validateFields_1.validateFields,
], authControllers_1.signUp);
routerAuth.post("/", authControllers_1.login);
routerAuth.get("/renew", validateJwt_1.validateJwt, authControllers_1.revalidateToken);
