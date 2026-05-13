import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectMongo = async () => {
  try {
    if (!process.env.MONGO_ATLAS_URL) {
      throw new Error("MONGO_ATLAS_URL no definida");
    }

    await mongoose.connect(process.env.MONGO_ATLAS_URL);

    logger.info("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    logger.error(`❌ Mongo error: ${error.message}`);
    process.exit(1);
  }
};