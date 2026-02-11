import { Router } from "express";
import { getAllProducts, getByIdProduct } from "../config/user.dao.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/cart.model.js";

const router = Router();

router.get("/form", async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.render("form",);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando form");
  }
});

router.get("/login", (req, res) => {
  res.render("form"); // o el nombre real de tu vista
});
router.get("/", async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.render("home", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando productos");
  }
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

    const cart = await Cart.findById(cid)
      .populate("products.product")
      .lean();

    if (!cart) return res.status(404).send("Carrito no encontrado");

    const productos = cart.products.map(p => ({
      _id: p.product._id,
      title: p.product.title,
      price: p.product.price,
      quantity: p.quantity
    }));
console.log("PRODUCTOS:", productos);

    const total = productos.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    res.render("realTimeProducts", {
      productos,
      total
    });
console.log("TOTAL:", total);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error mostrando carrito");
  }
});

export default router;
