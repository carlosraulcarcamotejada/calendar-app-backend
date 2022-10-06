import { RequestHandler } from "express";
import { User } from "../models/User";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { generateJWT } from "../helpers/jwt";

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: "El usuario ya existe.",
      });
    }

    user = new User(req.body);

    //Encrypt password
    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user?._id as unknown as string, user?.name);

    res.status(201).json({
      ok: true,
      message: "register",
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Por favor hable con el administrador.",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "El usuario no existe con ese email.",
      });
    }

    const validPassword = compareSync(password, user?.password || "");

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "Contraseña no válida.",
      });
    }

    const token = await generateJWT(user?._id as unknown as string, user?.name);

    res.status(200).json({
      ok: true,
      message: "login",
      _id: user?.id,
      name: user?.name,
      email: user?.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Por favor hable con el administrador.",
    });
  }
};

export const revalidateToken: RequestHandler = async (req, res) => {
  try {
    const { _id, name } = req.body;
    
    const token = await generateJWT(_id as unknown as string, name);

    res.json({
      ok: true,
      message: "renewtoken",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Por favor hable con el administrador.",
    });
  }
};
