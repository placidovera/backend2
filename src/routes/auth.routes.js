import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {User} from "../models/user.model.js";

const router = Router();
const JWT_SECRET = "mi_clave_secreta_jwt";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Contraseña incorrecta" });

    // Generar token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    // Guardar token en cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res.json({ message: "Login exitoso", user: { id: user._id, email: user.email, role: user.role } });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
