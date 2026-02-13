import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../config/dao.js";
import { User } from "../models/user.model.js";
import { createMailer } from "../config/email.js";

const router = Router();

/* =====================================================
   🔐 LOGIN
===================================================== */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        cartId: user.cartId
      },
      process.env.JWT_SECRET,
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
router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;

  res.render("resetPassword", { token });
});

/* =====================================================
   📧 SOLICITAR RECUPERACIÓN
===================================================== */

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    // Nunca revelar si existe o no
    if (!user) {
      return res.json({
        message: "Si el email existe, se enviará un enlace de recuperación"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const resetLink = `http://localhost:8080/api/auth/reset-password/${token}`;


    const mailer = createMailer();

    await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <h2>Recuperar contraseña</h2>
        <p>Haz click en el siguiente enlace:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expira en 1 hora.</p>
      `
    });

    res.json({
      message: "Si el email existe, se enviará un enlace de recuperación"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =====================================================
   🔄 RESTABLECER CONTRASEÑA
===================================================== */

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(decoded.id, {
      password: hashedPassword
    });

    res.json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    res.status(400).json({ error: "Token inválido o expirado" });
  }
});

/* =====================================================
   🚪 LOGOUT
===================================================== */

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
