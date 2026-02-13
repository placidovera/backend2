import { Router } from "express";
import { getAllProducts, getByIdCart } from "../config/dao.js";
import { authJWT, authorizeRole } from "../middleware/middleware.js";

const router = Router();

/* ===========================
   FORM
=========================== */
router.get("/", async (req, res) => {
  try {
    res.render("form");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando form");
  }
});

router.get("/login", (req, res) => {
  res.render("form");
});

/* ===========================
   HOME (requiere login)
=========================== */
router.get("/home", authJWT, async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.render("home", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando productos");
  }
});

/* ===========================
   CART GENERAL (requiere login)
=========================== */
router.get("/cart", authJWT, async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.render("realTimeProducts", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error mostrando carrito");
  }
});

/* ===========================
   CART POR ID (con roles)
=========================== */
router.get(
  "/cart/:cid",
  authJWT,
  authorizeRole("admin", "user"),
  async (req, res) => {
    try {
      const { cid } = req.params;

      // 🔐 Si es usuario común, solo puede ver su carrito
      if (req.user.role === "user" && req.user.cartId !== cid) {
        return res.status(403).send("No podés ver este carrito");
      }

      const cart = await getByIdCart(cid);

      if (!cart) return res.status(404).send("Carrito no encontrado");

      const productos = cart.products.map((p) => ({
        _id: p.product._id,
        title: p.product.title,
        price: p.product.price,
        quantity: p.quantity,
      }));

      const total = productos.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      );

      res.render("realTimeProducts", {
        productos,
        total,
      });

    } catch (error) {
      console.error(error);
      res.status(500).send("Error mostrando carrito");
    }
  }
);

export default router;
