import mongoose from "mongoose";

const baseMongooseOpts = {
  serverSelectionTimeoutMS: 1000,
};

export const conectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, baseMongooseOpts);
    console.log("Conectado a MongoDB LOCAL");
  } catch (err) {
    console.error("Mongo LOCAL error:", err.message);
    process.exit(1);
  }
};

export const conectMongoDbAtlas = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL, baseMongooseOpts);
    console.log("Conectado a MongoDB ATLAS");
  } catch (err) {
    console.error("Mongo ATLAS error:", err.message);
    process.exit(1);
  }
};

export const connectAuto = async () => {
  const target = (process.env.MONGO_TARGET || "LOCAL").toUpperCase();
  return target === "ATLAS" ? conectMongoDbAtlas() : conectMongoDb();
};
