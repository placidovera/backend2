import { Router } from "express";
import {createUserController,getAllUsersController,getByIdUsersController,upDataUsersController,deleteUsersController} from "../controller/user.controller.js";
import { authJWT, authorizeRole } from "../middleware/middleware.js";

const router = Router();

router.post("/register", createUserController);
router.get("/", authJWT,authorizeRole("admin"),getAllUsersController);
router.get("/:id",authJWT,authorizeRole("admin"), getByIdUsersController);
router.patch("/:id",authJWT,authorizeRole("admin"), upDataUsersController);
router.delete("/:id",authJWT,authorizeRole("admin"), deleteUsersController);

export default router;
