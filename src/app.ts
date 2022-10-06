import Express from "express";
import router from "./routes/auth";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

export const app = () => {
  const express = Express();

  express.use(cors());

  //Public directory
  express.use(Express.static("public"));

  // (middleware) reading and parsing the body:
  //peticiones que vengan se procesan ahí y va a extraer su
  // contenido
  express.use(Express.json());

  
  //Routes
  express.use("/api/auth", router);

  //Listen petitions
  express.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
  });
};


