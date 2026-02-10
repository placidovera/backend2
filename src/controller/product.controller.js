import {
  getProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById
} from "../service/product.service.js";

export const getProductsController = async (req, res) => {
  try {
    res.json(await getProducts());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    res.json(await getProductById(req.params.pid));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createProductController = async (req, res) => {
  try {
    res.status(201).json(await createNewProduct(req.body));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProductController = async (req, res) => {
  try {
    res.json(
      await updateProductById(req.params.pid, req.body)
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    res.json(await deleteProductById(req.params.pid));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
