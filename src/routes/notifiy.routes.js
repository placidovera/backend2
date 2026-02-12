import { Router } from "express";
import { createMailer } from "../config/email.js";
import { getCartById } from "../service/cart.service.js";

const router = Router();

router.post("/email", async (req, res) => {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res.status(400).json({ error: "CartId requerido" });
    }
      // Obtener carrito desde el servicio
    const cart = await getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    let total = 0;

    const productsHTML = cart.products.map(item => {
      const subtotal = item.productId.price * item.quantity;
      total += subtotal;

      return `
        <tr>
          <td>${item.productId.title}</td>
          <td>${item.quantity}</td>
          <td>$${item.productId.price}</td>
          <td>$${subtotal}</td>
        </tr>
      `;
    }).join("");

    const htmlContent = `
      <h2>🛒 Gracias por tu compra</h2>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${productsHTML}
        </tbody>
      </table>
      <h3>Total: $${total}</h3>
    `;

    const transporter = createMailer();

    const info = await transporter.sendMail({
      from: `"Tienda Online" <${process.env.MAIL_USER}>`,
      to: "pmartin_vera@live.com",
      subject: "Resumen de tu compra",
      html: htmlContent
    });

    res.json({
      status: "ok",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("ERROR MAIL:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
