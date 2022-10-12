import { connect } from "mongoose";


export const dbConnection = async () => {
  try {
    const db = await connect(process.env.DB_CNN || "");

    console.log(`Connected to: ${db.connection.name}`);
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la base de datos");
  }
};
