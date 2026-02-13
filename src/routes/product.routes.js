import { Router } from "express";
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} from "../controller/product.controller.js";
import { authJWT, authorizeRole } from "../middleware/middleware.js";

const router = Router();

router.get("/", getProductsController);
router.get("/:pid", getProductByIdController);
router.post("/", createProductController);
router.put("/:pid",authJWT,authorizeRole("admin"), updateProductController);
router.delete("/:pid", authJWT,authorizeRole("admin"), deleteProductController);

export default router;
