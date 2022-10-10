/*
 Event routes
 /api/events
*/

import { Router } from "express";
import { check } from "express-validator";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventsControllers";
import { isDate } from "../helpers/isDate";
import { validateFields } from "../middlewares/validateFields";
import { validateJwt } from "../middlewares/validateJwt";

const routerEvents = Router();

routerEvents.use(validateJwt);

routerEvents.get("/", getEvents);

routerEvents.post(
  "/",
  [
    //Middlewares
    check("title", "El título es obligatorio.").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria.").custom(isDate),
    check("end", "La fecha de finalización es obligatoria.").custom(isDate),
    validateFields,
  ],
  createEvent
);

routerEvents.put(
  "/:_id",
  //Middlewares
  check("title", "El título es obligatorio.").not().isEmpty(),
  check("start", "La fecha de inicio es obligatoria.").custom(isDate),
  check("end", "La fecha de finalización es obligatoria.").custom(isDate),
  validateFields,
  updateEvent
);

routerEvents.delete("/:_id", deleteEvent);

export { routerEvents };
