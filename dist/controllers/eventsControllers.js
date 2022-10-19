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
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvents = void 0;
const EventModel_1 = require("../models/EventModel");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield EventModel_1.Event.find();
        return res.status(200).json({
            ok: true,
            controller: "getEvents",
            events,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            controller: "getEvents",
            message: "Por favor hable con el administrador.",
        });
    }
});
exports.getEvents = getEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _id = (req === null || req === void 0 ? void 0 : req.body._id) || "";
        (_a = req.body) === null || _a === void 0 ? true : delete _a._id;
        const event = new EventModel_1.Event(req.body);
        event.user = _id;
        const savedEvent = yield event.save();
        return res.status(201).json({
            ok: true,
            controller: "createEvent",
            message: "createEvent",
            savedEvent,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            controller: "createEvent",
            message: "Por favor hable con el administrador.",
        });
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        const event_id = ((_b = req.params) === null || _b === void 0 ? void 0 : _b._id) || "";
        const _idUser = ((_c = req.body) === null || _c === void 0 ? void 0 : _c._id) || "";
        const event = yield EventModel_1.Event.findById(event_id);
        //Validar que la persona que está logueada, le pertene el registro que se
        //quiere modificar
        if (!event) {
            return res.status(404).json({
                ok: false,
                controller: "updateEvent",
                message: "No se encontró el registro.",
            });
        }
        if (((_d = event.user) === null || _d === void 0 ? void 0 : _d.valueOf()) !== _idUser) {
            return res.status(401).json({
                ok: false,
                controller: "updateEvent",
                message: "No tiene privilegios para editar este evento.",
            });
        }
        (_e = req.body) === null || _e === void 0 ? true : delete _e._id;
        const toUpdateEvent = new EventModel_1.Event(Object.assign(Object.assign({}, req.body), { _id: event._id }));
        const updatedEvent = yield EventModel_1.Event.findByIdAndUpdate(event_id, toUpdateEvent, { new: true });
        return res.status(200).json({
            ok: true,
            controller: "updateEvent",
            updatedEvent,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            controller: "updateEvent",
            message: "por favor hable con el administrador...(catch)",
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    try {
        const event_id = ((_f = req.params) === null || _f === void 0 ? void 0 : _f._id) || "";
        const _idUser = ((_g = req.body) === null || _g === void 0 ? void 0 : _g._id) || "";
        const event = yield EventModel_1.Event.findById(event_id);
        if (!event) {
            return res.status(404).json({
                ok: false,
                controller: "updateEvent",
                message: "No se encontró el registro.",
            });
        }
        if (((_h = event.user) === null || _h === void 0 ? void 0 : _h.valueOf()) !== _idUser) {
            return res.status(401).json({
                ok: false,
                controller: "updateEvent",
                message: "No tiene privilegios para eliminar este evento.",
            });
        }
        const deletedEvent = yield EventModel_1.Event.findByIdAndDelete(event_id);
        return res.status(200).json({
            ok: true,
            controller: "deleteEvent",
            deletedEvent,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            controller: "deleteEvent",
            message: "Por favor hable con el administrador.",
        });
    }
});
exports.deleteEvent = deleteEvent;
