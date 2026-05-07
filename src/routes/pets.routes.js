import { Router } from "express";
import {
  getPetsController,
  getPetsByIdController,
  createPetsController,
  updatePetsController,
  deletePetsController
} from "../controller/pets.controller.js";
import { authJWT, authorizeRole } from "../middleware/middleware.js";

const router = Router();

router.get("/", getPetsController);
router.get("/:pid", getPetsByIdController);
router.post("/", createPetsController);
router.put("/:pid",authJWT,authorizeRole("admin"), updatePetsController);
router.delete("/:pid", deletePetsController);

export default router;
