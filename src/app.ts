import Express from "express";
import { routerAuth } from "./routes/routerAuth";
import { routerEvents } from "./routes/routerEvent";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

export const app = () => {
  const express = Express();

  //
  express.use(cors());

  //Public directory
  // express.use(Express.static("public"));

  // (middleware) reading and parsing the body:
  //peticiones que vengan se procesan ahí y va a extraer su
  // contenido
  express.use(Express.json());

  //Routes
  express.use("/api/auth", routerAuth);
  express.use("/api/events", routerEvents);

  // express.get("*", (req, res) => {
  //   res.sendFile(__dirname + "/public/index.html");
  // });

  //Listen petitions
  express.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
  });
};
