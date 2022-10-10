"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dbConnection_1 = require("./database/dbConnection");
(0, dbConnection_1.dbConnection)();
(0, app_1.app)();
