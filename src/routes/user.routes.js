import { Router } from "express";
import {createUserController,getAllUsersController,getByIdUsersController,upDataUsersController,deleteUsersController} from "../controller/user.controller.js";

const router = Router();

router.post("/register", createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getByIdUsersController);
router.patch("/:id", upDataUsersController);
router.delete("/:id", deleteUsersController);

export default router;
