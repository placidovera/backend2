import mongoose from "mongoose";

//URLs 
const MONGO_URL = "mongodb://127.0.0.1:27017/claseBackEndDos";
const MONGO_ATLAS_URL ="mongodb+srv://pmartinvera_db_user:pelado1983@cluster0.usuraz5.mongodb.net/";

//Elegir conexión: "LOCAL" o "ATLAS"
const MONGO_TARGET = "LOCAL";

const baseMongooseOpts = {
  serverSelectionTimeoutMS: 1000
};

export const conectMongoDb = async () => {
  try {
    await mongoose.connect(MONGO_URL, baseMongooseOpts);
    console.log("Conectado a MongoDB LOCAL");
  } catch (err) {
    console.error("Mongo LOCAL error:", err.message);
    process.exit(1);
  }
};

export const conectMongoDbAtlas = async () => {
  try {
    await mongoose.connect(MONGO_ATLAS_URL, baseMongooseOpts);
    console.log("Conectado a MongoDB ATLAS");
  } catch (err) {
    console.error("Mongo ATLAS error:", err.message);
    process.exit(1);
  }
};

export const connectAuto = async () => {
  return MONGO_TARGET === "ATLAS"
    ? conectMongoDbAtlas()
    : conectMongoDb();
};
