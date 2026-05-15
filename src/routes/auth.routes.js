import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../config/dao.js";
import logger from "../utils/logger.js";

const router = Router();

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    logger.info(`Login attempt: ${email}`);

    const user = await getUserByEmail(email);

    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`);

      return res.status(401).json({
        message: "Usuario no encontrado",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      logger.warn(`Login failed - invalid password: ${email}`);

      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        cartId: user.cartId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    logger.info(`Login successful: ${email}`);

   res.json({
  message: "Login exitoso",
  token,
  user: {
    id: user._id,
    email: user.email,
    role: user.role,
  },
  
});
  } catch (error) {
    logger.error(`Login error: ${error.message}`);

    res.status(500).json({
      error: error.message,
    });
  }
});

/* LOGOUT */
router.post("/logout", (req, res) => {
  try {
    logger.info("User logout");

    res.clearCookie("token", {
      httpOnly: true,
    });

    res.json({
      message: "Logout exitoso",
    });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;