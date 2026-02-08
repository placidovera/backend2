import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import viewRouter from "./routes/view.routes.js"
import sessionRoutes from "./routes/session.routes.js";
import { connectAuto } from "./config/conect.config.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
// HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

// Passport
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/", viewRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/session", sessionRoutes);

// Start server
const startServer = async () => {
  await connectAuto();
  app.listen(8080, () => console.log("App running on port 8080"));
};
startServer();
