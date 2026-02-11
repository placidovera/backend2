import {
  getAllCart,
  getByIdCart,
  createCart,
  upDataCart,
  deleteByIdCart,
  getRawCartById 
} from "../config/user.dao.js";

// CREAR NUEVO CARRITO
export const createNewCart = async () => {
  return createCart({ products: [] });
};

// AGREGAR PRODUCTO
export const addProductToCart = async (cid, pid) => {
  const cart = await getRawCartById(cid);
  if (!cart) throw new Error("Carrito no encontrado");

  const product = cart.products.find(
    p => p.productId.toString() === pid.toString()
  );

  if (product) {
    product.quantity += 1; 
  } else {
    cart.products.push({ productId: pid, quantity: 1 });
  }

  return upDataCart(cid, cart);
};

// DECREMENTAR PRODUCTO
export const decrementProductFromCart = async (cid, pid) => {
  const cart = await getRawCartById(cid);
  if (!cart) throw new Error("Carrito no encontrado");

  const productIndex = cart.products.findIndex(
    p => p.productId.toString() === pid.toString()
  );

  if (productIndex === -1) throw new Error("Producto no encontrado");

  if (cart.products[productIndex].quantity > 1) {
    cart.products[productIndex].quantity -= 1;
  } else {
    
    cart.products.splice(productIndex, 1);
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

// OBTENER CARRITO CON populate
export const getCartById = async (cid) => {
  const cart = await getByIdCart(cid); 
  if (!cart) throw new Error("Carrito no encontrado");
  return cart;
};

// ELIMINAR CARRITO
export const deleteCart = async (cid) => {
  return deleteByIdCart(cid);
};

export const getAllCarts = async () => {
  return getAllCart();
}