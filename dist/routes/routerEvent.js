"use strict";
/*
 Event routes
 /api/events
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEvents = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const eventsControllers_1 = require("../controllers/eventsControllers");
const isDate_1 = require("../helpers/isDate");
const validateFields_1 = require("../middlewares/validateFields");
const validateJwt_1 = require("../middlewares/validateJwt");
const routerEvents = (0, express_1.Router)();
exports.routerEvents = routerEvents;
routerEvents.use(validateJwt_1.validateJwt);
routerEvents.get("/", eventsControllers_1.getEvents);
routerEvents.post("/", [
    //Middlewares
    (0, express_validator_1.check)("title", "El título es obligatorio.").not().isEmpty(),
    (0, express_validator_1.check)("start", "La fecha de inicio es obligatoria.").custom(isDate_1.isDate),
    (0, express_validator_1.check)("end", "La fecha de finalización es obligatoria.").custom(isDate_1.isDate),
    validateFields_1.validateFields,
], eventsControllers_1.createEvent);
routerEvents.put("/:_id", 
//Middlewares
(0, express_validator_1.check)("title", "El título es obligatorio.").not().isEmpty(), (0, express_validator_1.check)("start", "La fecha de inicio es obligatoria.").custom(isDate_1.isDate), (0, express_validator_1.check)("end", "La fecha de finalización es obligatoria.").custom(isDate_1.isDate), validateFields_1.validateFields, eventsControllers_1.updateEvent);
routerEvents.delete("/:_id", eventsControllers_1.deleteEvent);
