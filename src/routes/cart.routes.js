import { Router } from "express";
import {
  getAllCartsController,
  getByIdCartController,
  createCartController,
  addProductController,
  decrementProductController,
  removeProductController,
  deleteCartController
} from "../controller/cart.controller.js";

const router = Router();

// Carritos
router.get("/", getAllCartsController);
router.get("/:cid", getByIdCartController);
router.post("/", createCartController);
router.delete("/:cid", deleteCartController);

// Productos en carrito
router.post("/:cid/product/:pid", addProductController);      // agregar / incrementar
router.put("/:cid/product/:pid", decrementProductController); // decrementar
router.delete("/:cid/product/:pid", removeProductController); // eliminar

export default router;
