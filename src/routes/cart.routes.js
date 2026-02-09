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

router.get("/", getAllCartsController);
router.get("/:cid", getByIdCartController);
router.post("/", createCartController);

router.post("/:cid/product/:pid", addProductController);
router.put("/:cid/product/:pid", decrementProductController);
router.delete("/:cid/product/:pid", removeProductController);

router.delete("/:cid", deleteCartController);

export default router;
