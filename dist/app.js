"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routerAuth_1 = require("./routes/routerAuth");
const routerEvent_1 = require("./routes/routerEvent");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = () => {
    const express = (0, express_1.default)();
    //
    express.use((0, cors_1.default)());
    //Public directory
    express.use(express_1.default.static("public"));
    // (middleware) reading and parsing the body:
    //peticiones que vengan se procesan ahí y va a extraer su
    // contenido
    express.use(express_1.default.json());
    //Routes
    express.use("/api/auth", routerAuth_1.routerAuth);
    express.use("/api/events", routerEvent_1.routerEvents);
    express.get("*", (req, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });
    //Listen petitions
    express.listen(process.env.PORT, () => {
        console.log(`Server on port ${process.env.PORT}`);
    });
};
exports.app = app;
