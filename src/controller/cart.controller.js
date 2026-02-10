import {
  getAllCarts,
  getCartById,
  createNewCart,
  addProductToCart,
  decrementProductFromCart,
  removeProductFromCart,
  deleteCart
} from "../service/cart.service.js";

export const getAllCartsController = async (req, res) => {
  try {
    res.json(await getAllCarts());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getByIdCartController = async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);

    res.json({
      _id: cart._id,
      products: cart.products
    });

  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};


export const createCartController = async (req, res) => {
  try {
    res.status(201).json(await createNewCart());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const addProductController = async (req, res) => {
  try {
    res.status(201).json(
      await addProductToCart(req.params.cid, req.params.pid)
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const decrementProductController = async (req, res) => {
  try {
    res.json(
      await decrementProductFromCart(req.params.cid, req.params.pid)
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const removeProductController = async (req, res) => {
  try {
    res.json(
      await removeProductFromCart(req.params.cid, req.params.pid)
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    await deleteCart(req.params.cid);
    res.json({ message: "CARRITO ELIMINADO" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
