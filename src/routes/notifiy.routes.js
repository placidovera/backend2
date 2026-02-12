import { Router } from "express";
import { createMailer} from "../config/email.js";
const router = Router();
router.get("/email", async (req, res) => {
  try {
    console.log("👉 Creando transporter...");
    const transporter = createMailer();

    console.log("👉 Enviando mail...");
    const info = await transporter.sendMail({
      from: `"Hola, este es un mensaje automatico" <${process.env.MAIL_USER}>`,
      to: "pmartin_vera@live.com",
      subject: "Martin Vera",
      text: "Hello world?",
      html: "<b>Gracias por su compra</b>",
    });

    console.log("📨 Resultado completo:", info);

    res.json({
      status: "ok",
      response: info.response,
      messageId: info.messageId,
    });

  } catch (error) {
    console.error("❌ ERROR REAL:", error);
    res.status(500).json({
      message: error.message,
      code: error.code,
    });
  }
});


export default router;
