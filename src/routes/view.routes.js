import { Router } from "express";
import { getAllProducts, getByIdProduct } from "../config/user.dao.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/cart.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.render("home", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando productos");
  }
});

// DETALLE DE PRODUCTO
router.get("/product/:pid", async (req, res) => {
  try {
    const producto = await getByIdProduct(req.params.pid);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("product", { producto });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando producto");
  }
});
router.get("/product/:pid", async (req, res) => {
  const producto = await getByIdProduct(req.params.pid);

  if (!producto) {
    return res.status(404).send("Producto no encontrado");

  }

  res.render("product", { producto });
});
router.get("/cart", async (req, res) => {
  try {

    const productos = await Product.find().lean();

    res.render("realTimeProducts", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error mostrando carrito");
  }
});
router.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.product").lean();

    if (!cart) return res.status(404).send("Carrito no encontrado");

    // Pasamos los productos del carrito a la vista
    res.render("realTimeProducts", { productos: cart.products.map(p => ({
      _id: p.product._id,
      title: p.product.title,
      price: p.product.price,
      quantity: p.quantity
    })) });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error mostrando carrito");
  }
});
export default router;
