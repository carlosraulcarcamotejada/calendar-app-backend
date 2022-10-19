"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateToken = exports.login = exports.signUp = void 0;
const UserModel_1 = require("../models/UserModel");
const bcryptjs_1 = require("bcryptjs");
const generateJWT_1 = require("../helpers/generateJWT");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield UserModel_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                controller: "signUp",
                message: "El usuario ya existe.",
            });
        }
        user = new UserModel_1.User(req.body);
        //Encrypt password
        const salt = (0, bcryptjs_1.genSaltSync)();
        user.password = (0, bcryptjs_1.hashSync)(password, salt);
        yield user.save();
        const token = yield (0, generateJWT_1.generateJWT)(user._id.toString(), user.email, user.name, user.lastname);
        return res.status(201).json({
            ok: true,
            controller: "signUp",
            message: "register",
            _id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            controller: "signUp",
            message: "Por favor hable con el administrador.",
        });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield UserModel_1.User.findOne({ email: email.toString().toLowerCase() });
        if (!user) {
            return res.status(400).json({
                ok: false,
                controller: "login",
                message: "El usuario no existe con ese email.",
            });
        }
        const validPassword = (0, bcryptjs_1.compareSync)(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                controller: "login",
                message: "Contraseña no válida.",
            });
        }
        const token = yield (0, generateJWT_1.generateJWT)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.lastname);
        return res.status(200).json({
            ok: true,
            controller: "login",
            message: "login",
            _id: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.name,
            lastname: user === null || user === void 0 ? void 0 : user.lastname,
            email: user === null || user === void 0 ? void 0 : user.email,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            controller: "login",
            message: "Por favor hable con el administrador.",
        });
    }
});
exports.login = login;
const revalidateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, email, name, lastname } = req.body;
        const token = yield (0, generateJWT_1.generateJWT)(_id, email, name, lastname);
        return res.json({
            ok: true,
            controller: "revalidateToken",
            message: "renewtoken",
            token,
            _id,
            email,
            name,
            lastname,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            controller: "revalidateToken",
            message: "Por favor hable con el administrador.",
        });
    }
});
exports.revalidateToken = revalidateToken;
