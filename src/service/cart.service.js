import {
  getAllCart,
  getByIdCart,
  createCart,
  deleteByIdCart,
  upDataCart
} from "../config/user.dao.js";

/* =========================
   OBTENER TODOS
========================= */
export const getAllCarts = async () => {
  return getAllCart();
};

/* =========================
   OBTENER POR ID
========================= */
export const getCartById = async (cid) => {
  const cart = await getByIdCart(cid);
  if (!cart) throw new Error("CARRITO NO ENCONTRADO");
  return cart;
};

/* =========================
   CREAR CARRITO
========================= */
export const createNewCart = async () => {
  return createCart({ products: [] });
};

/* =========================
   AGREGAR PRODUCTO
========================= */
export const addProductToCart = async (cid, pid) => {
  const cart = await getByIdCart(cid);
  if (!cart) throw new Error("CARRITO NO ENCONTRADO");

  const productIndex = cart.products.findIndex(
    p => p.productId.toString() === pid
  );

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += 1;
  } else {
    cart.products.push({ productId: pid, quantity: 1 });
  }

  return upDataCart(cid, { products: cart.products });
};

/* =========================
   DECREMENTAR PRODUCTO
========================= */
export const decrementProductFromCart = async (cid, pid) => {
  const cart = await getByIdCart(cid);
  if (!cart) throw new Error("CARRITO NO ENCONTRADO");

  const productIndex = cart.products.findIndex(
    p => p.productId.toString() === pid
  );

  if (productIndex === -1) {
    throw new Error("PRODUCTO NO ENCONTRADO EN EL CARRITO");
  }

  if (cart.products[productIndex].quantity > 1) {
    cart.products[productIndex].quantity -= 1;
  }

  return upDataCart(cid, { products: cart.products });
};

/* =========================
   ELIMINAR PRODUCTO
========================= */
export const removeProductFromCart = async (cid, pid) => {
  const cart = await getByIdCart(cid);
  if (!cart) throw new Error("CARRITO NO ENCONTRADO");

  const products = cart.products.filter(
    p => p.productId.toString() !== pid
  );

  return upDataCart(cid, { products });
};

/* =========================
   ELIMINAR CARRITO
========================= */
export const deleteCart = async (cid) => {
  return deleteByIdCart(cid);
};
