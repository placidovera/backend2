import mongoose from "mongoose";
import logger from "../utils/logger.js";

const baseMongooseOpts = {
  serverSelectionTimeoutMS: 1000,
};

export const conectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, baseMongooseOpts);

    logger.info("Conectado a MongoDB LOCAL");
  } catch (err) {
    logger.error(`Mongo LOCAL error: ${err.message}`);

    process.exit(1);
  }
};

export const conectMongoDbAtlas = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL, baseMongooseOpts);

    logger.info("Conectado a MongoDB ATLAS");
  } catch (err) {
    logger.error(`Mongo ATLAS error: ${err.message}`);

    process.exit(1);
  }
};

export const connectAuto = async () => {
  const target = (process.env.MONGO_TARGET || "LOCAL").toUpperCase();

  logger.info(`Mongo target selected: ${target}`);

  return target === "ATLAS"
    ? conectMongoDbAtlas()
    : conectMongoDb();
};