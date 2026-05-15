import { Router } from "express";

import {
  getAdoptionsController,
  getAdoptionByIdController,
  createAdoptionController
} from "../controller/adoptions.controller.js";
import { authJWT, authorizeRole } from "../middleware/middleware.js";

const router = Router();

router.get("/", getAdoptionsController);

router.get("/:aid",authJWT,getAdoptionByIdController);

router.post("/:uid/:pid",authJWT,createAdoptionController);

export default router;