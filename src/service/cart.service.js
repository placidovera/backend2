import { Cart } from "../models/cart.model.js";

// ========================
// OBTENER TODOS
// ========================
export const getAllCarts = async () => {
  return Cart.find()
    .populate("products.productId")
    .lean();
};

// ========================
// OBTENER POR ID
// ========================
export const getCartById = async (cid) => {
  const cart = await Cart.findById(cid)
    .populate("products.productId")
    .lean();

  if (!cart) throw new Error("Carrito no encontrado");

  return cart;
};

// ========================
// CREAR CARRITO
// ========================
export const createNewCart = async () => {
  return Cart.create({ products: [] });
};

// ========================
// AGREGAR PRODUCTO
// ========================
export const addProductToCart = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  if (!cart) throw new Error("Carrito no encontrado");

  const product = cart.products.find(
    p => p.productId.toString() === pid
  );

  if (product) {
    product.quantity++;
  } else {
    cart.products.push({ productId: pid, quantity: 1 });
  }

  await cart.save();

  return Cart.findById(cid)
    .populate("products.productId")
    .lean();
};

// ========================
// DECREMENTAR
// ========================
export const decrementProductFromCart = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  if (!cart) throw new Error("Carrito no encontrado");

  const product = cart.products.find(
    p => p.productId.toString() === pid
  );

  if (!product) throw new Error("Producto no encontrado");

  if (product.quantity > 1) product.quantity--;

  await cart.save();

  return Cart.findById(cid)
    .populate("products.productId")
    .lean();
};

// ========================
// ELIMINAR PRODUCTO
// ========================
export const removeProductFromCart = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  if (!cart) throw new Error("Carrito no encontrado");

  cart.products = cart.products.filter(
    p => p.productId.toString() !== pid
  );

  await cart.save();

  return Cart.findById(cid)
    .populate("products.productId")
    .lean();
};

// ========================
// ELIMINAR CARRITO
// ========================
export const deleteCart = async (cid) => {
  return Cart.findByIdAndDelete(cid);
};
