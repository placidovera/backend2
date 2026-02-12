import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import viewRouter from "./routes/view.routes.js";
import cartRouter from "./routes/cart.routes.js";
import prodRoutes from "./routes/product.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import notifyRoutes from "./routes/notifiy.routes.js"

import { connectAuto } from "./config/conect.config.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
const app = express();

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

app.use(express.static(path.join(process.cwd(), "src", "public")));

// =======================
// HANDLEBARS
// =======================
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

// =======================
// PASSPORT
// =======================
initializePassport();
app.use(passport.initialize());

// =======================
// ROUTES
// =======================
app.use("/", viewRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/session", sessionRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/products", prodRoutes);
app.use("/api/notify",notifyRoutes)
// =======================
// SERVER
// =======================
const startServer = async () => {
  await connectAuto();
  app.listen(8080, () =>
    console.log("App running on http://localhost:8080")
  );
};

startServer();
//ttmu smxs azsl veek