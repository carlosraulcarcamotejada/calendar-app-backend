import { RequestHandler } from "express";
import { Event } from "../models/EventModel";

export const getEvents: RequestHandler = async (req, res) => {
  try {
    const events = await Event.find();

    return res.status(200).json({
      ok: true,
      controller: "getEvents",
      events,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      controller: "getEvents",
      message: "Por favor hable con el administrador.",
    });
  }
};

export const createEvent: RequestHandler = async (req, res) => {
  try {
    const _id = req?.body._id || "";

    delete req.body?._id;

    const event = new Event(req.body);

    event.user = _id;

    const savedEvent = await event.save();

    return res.status(201).json({
      ok: true,
      controller: "createEvent",
      message: "createEvent",
      savedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      controller: "createEvent",
      message: "Por favor hable con el administrador.",
    });
  }
};

export const updateEvent: RequestHandler = async (req, res) => {
  try {
    const event_id = req.params?._id || "";
    const _idUser = req.body?._id || "";

    const event = await Event.findById(event_id);

    //Validar que la persona que está logueada, le pertene el registro que se
    //quiere modificar

    if (!event) {
      return res.status(404).json({
        ok: false,
        controller: "updateEvent",
        message: "No se encontró el registro.",
      });
    }

    if (event.user?.valueOf() !== _idUser) {
      return res.status(401).json({
        ok: false,
        controller: "updateEvent",
        message: "No tiene privilegios para editar este evento.",
      });
    }

    delete req.body?._id;

    const toUpdateEvent = new Event({
      ...req.body,
      _id: event._id,
    });

    const updatedEvent = await Event.findByIdAndUpdate(
      event_id,
      toUpdateEvent,
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      controller: "updateEvent",
      updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      controller: "updateEvent",
      message: "por favor hable con el administrador...(catch)",
    });
  }
};

export const deleteEvent: RequestHandler = async (req, res) => {
  try {
    const event_id = req.params?._id || "";
    const _idUser = req.body?._id || "";

    const event = await Event.findById(event_id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        controller: "updateEvent",
        message: "No se encontró el registro.",
      });
    }

    if (event.user?.valueOf() !== _idUser) {
      return res.status(401).json({
        ok: false,
        controller: "updateEvent",
        message: "No tiene privilegios para eliminar este evento.",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(event_id);

    return res.status(200).json({
      ok: true,
      controller: "deleteEvent",
      deletedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      controller: "deleteEvent",
      message: "Por favor hable con el administrador.",
    });
  }
};
