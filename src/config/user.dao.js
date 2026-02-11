import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/Product.js";

/* ========= USERS ========= */

export const getAll = async () => User.find().lean();

export const getById = async (id) => User.findById(id);

export const create = async (data) => User.create(data);

export const deleteById = async (id) => User.findByIdAndDelete(id);

export const upData = async (id, data) => User.findByIdAndUpdate(id, data, { new: true });

export const getUserByEmail = async (email) => User.findOne({ email });

/* ========= CART ========= */
export const getAllCart = async () => Cart.find().populate("products.productId");

export const getByIdCart = async (id) => Cart.findById(id).populate("products.productId");

export const createCart = async (data) => Cart.create(data);

export const deleteByIdCart = async (id) => Cart.findByIdAndDelete(id);

export const upDataCart = async (id, data) => Cart.findByIdAndUpdate(id, data, { new: true });

export const getRawCartById = async (id) => Cart.findById(id);
/* ========= PRODUCTS ========= */

export const getAllProducts = async () => Product.find().lean();

export const getByIdProduct = async (id)=> Product.findById(id).lean();

export const createProduct = async (data) => Product.create(data);

export const deleteByIdProduct = async (id) =>Product.findByIdAndDelete(id);

export const updateProduct = async (id, data) =>Product.findByIdAndUpdate(id, data, { new: true });
