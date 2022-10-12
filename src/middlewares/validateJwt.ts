import { verify } from "jsonwebtoken";
import { RequestHandler } from "express";

interface JwtPayload {
  _id: string;
  email: string;
}

export const validateJwt: RequestHandler = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No hay token en la petición.",
    });
  }

  try {
    const payload = verify(
      token,
      process.env.SECRET_JWT_SEED || ""
    ) as JwtPayload;

    const { _id = "", email = "" } = payload;

    req.body._id = _id;
    req.body.email = email;


  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token no válido.",
    });
  }

  next();
};
