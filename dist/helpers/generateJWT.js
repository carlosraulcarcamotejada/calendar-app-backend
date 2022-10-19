"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateJWT = (_id, email, name, lastname) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            email,
            name,
            lastname,
        };
        (0, jsonwebtoken_1.sign)(payload, process.env.SECRET_JWT_SEED || "", { expiresIn: "2h" }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token");
            }
            resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
