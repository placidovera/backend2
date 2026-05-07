import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "./docs/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import petsRoutes from "./routes/pets.routes.js";
import sessionRoutes from "./routes/session.routes.js";

import { connectAuto } from "./config/conect.config.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

app.use(express.static(path.join(process.cwd(), "src", "public")));

// PASSPORT
initializePassport();
app.use(passport.initialize());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/session", sessionRoutes);
app.use("/api/pets", petsRoutes);
app.use("/apidocs",swaggerUi.serve,swaggerUi.setup(specs));

// SERVER
const startServer = async () => {
  await connectAuto();
  app.listen(8080, () =>
    console.log("App running on http://localhost:8080")
  );
};

startServer();
