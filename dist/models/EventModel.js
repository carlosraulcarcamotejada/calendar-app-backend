"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    bgColor: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const Event = (0, mongoose_1.model)("Event", EventSchema);
exports.Event = Event;
