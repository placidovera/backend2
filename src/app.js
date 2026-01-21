import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import { connectAuto } from "./config/conect.config.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/session", sessionRoutes);

// Start server
const startServer = async () => {
  await connectAuto();
  app.listen(8080, () => console.log("App running on port 8080"));
};
startServer();
