import { sign } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateJWT = (_id: string= '' , name: string = "") => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id,
      name,
    };

    sign(
      payload,
      process.env.SECRET_JWT_SEED || "",
      { expiresIn: "2h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};
