import { Router } from "express";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { authJWT } from "../middleware/middleware.js";

import bcrypt from "bcrypt";

const router = Router();

// CREATE
router.post("/register", async (req, res) => {
  try {
    const { first_name,last_name, age, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: "firstName, lastName, email y password son obligatorios"
      });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        message: `el email ${email} ya está en uso`
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const cart = await Cart.create({ products: [] });

    const newUser = await User.create({
      first_name,
      last_name,
      age,
      email,
      password: hashPassword,
      cart: cart._id,
      role 
    });

    res.status(201).json({
      message: "usuario creado correctamente",
      user: {
        id: newUser._id,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        cart: newUser.cart
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ BY ID
router.get("/:id", authJWT,async (req, res) => {
     const {id}=req.params
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }

    res.json({ user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
router.patch("/:id",authJWT, async (req, res) => {
  try {
    const data = req.body;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }

    res.json({
      message: "usuario actualizado",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id",authJWT, async (req, res) => {
    const {id}=req.params
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }

    res.json({ message: "usuario eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
