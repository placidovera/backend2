import { Router } from "express";
import {Cart} from "../models/cart.model.js";


const router = Router();

router.get("/cart", async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error mostrando carrito");
  }
});

export default router;
