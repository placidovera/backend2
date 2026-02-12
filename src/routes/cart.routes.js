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
router.post("/:cid/product/:pid", addProductController);    
router.put("/:cid/product/:pid", decrementProductController); 
router.delete("/:cid/product/:pid", removeProductController); 

export default router;
