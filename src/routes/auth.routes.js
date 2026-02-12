import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const router = Router();
const JWT_SECRET = "mi_clave_secreta_jwt";

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000
    });

    res.json({
      message: "Login exitoso",
      user: { id: user._id, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
