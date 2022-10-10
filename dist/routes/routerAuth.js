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
    (0, express_validator_1.check)("name", "El nombre es obligatorio.").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio.").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio.").isLength({
        min: 8,
        max: 12,
    }),
    validateFields_1.validateFields,
], authControllers_1.signUp);
routerAuth.post("/", [
    //Middlewares validators
    (0, express_validator_1.check)("email", "El email es obligatorio.").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio.").isLength({
        min: 8,
        max: 12,
    }),
    validateFields_1.validateFields,
], authControllers_1.login);
routerAuth.get("/renew", validateJwt_1.validateJwt, authControllers_1.revalidateToken);
