import {
  getAllCart,
  getByIdCart,
  createCart,
  upDataCart,
  deleteByIdCart,
  getRawCartById
} from "../config/dao.js";

// CREAR NUEVO CARRITO
export const createNewCart = async () => {
  return createCart({ products: [] });
};

// AGREGAR PRODUCTO
export const addProductToCart = async (cid, pid) => {
  const cart = await getRawCartById(cid);
  if (!cart) throw new Error("Carrito no encontrado");

  const productInCart = cart.products.find(
    p => p.productId.toString() === pid.toString()
  );

  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cart.products.push({ productId: pid, quantity: 1 });
  }

  return upDataCart(cid, cart);
};

// ELIMINAR PRODUCTO
export const removeProductFromCart = async (cid, pid) => {
  const cart = await getRawCartById(cid);
  if (!cart) throw new Error("Carrito no encontrado");

  cart.products = cart.products.filter(
    p => p.productId.toString() !== pid.toString()
  );

  return upDataCart(cid, cart);
};

// OBTENER CARRITO PARA RENDER 
export const getCartById = async (cid) => {
  const cart = await getByIdCart(cid); 
  if (!cart) throw new Error("Carrito no encontrado");

  cart.products = cart.products.filter(p => p.productId != null);

  return cart;
};

// ELIMINAR CARRITO
export const deleteCart = async (cid) => {
  return deleteByIdCart(cid);
};

// OBTENER TODOS LOS CARRITOS
export const getAllCarts = async () => {
  return getAllCart();
};
