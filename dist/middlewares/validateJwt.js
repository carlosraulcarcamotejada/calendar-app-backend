"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const validateJwt = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No hay token en la petición.",
        });
    }
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_JWT_SEED || "");
        const { _id = "", email = "", name = "", lastname = "" } = payload;
        req.body._id = _id;
        req.body.email = email;
        req.body.name = name;
        req.body.lastname = lastname;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Token no válido.",
        });
    }
    next();
};
exports.validateJwt = validateJwt;
