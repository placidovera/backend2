import {
  getAllProducts,
  getByIdProduct,
  createProduct,
  updateProduct,
  deleteByIdProduct
} from "../config/dao.js";

//MOSTRAR TODOS

export const getProducts = async () => {
  try {
    return await getAllProducts();
  } catch (error) {
    throw error;
  }
};

//MOSTRAR POR ID

export const getProductById = async (pid) => {
  try {
    const product = await getByIdProduct(pid);
    if (!product) throw new Error("PRODUCTO NO ENCONTRADO");
    return product;
  } catch (error) {
    throw error;
  }
};

//CREAR PRODUCTO
export const createNewProduct = async (data) => {
  try {
    return await createProduct(data);
  } catch (error) {
    throw error;
  }
};

//MODIFICAR PRODUCTO
export const updateProductById = async (pid, data) => {
  try {
    const updated = await updateProduct(pid, data);
    if (!updated) throw new Error("PRODUCTO NO ENCONTRADO");
    return updated;
  } catch (error) {
    throw error;
  }
};

//ELIMINAR PRODUCTO
export const deleteProductById = async (pid) => {
  try {
    const deleted = await deleteByIdProduct(pid);
    if (!deleted) throw new Error("PRODUCTO NO ENCONTRADO");
    return deleted;
  } catch (error) {
    throw error;
  }
};
