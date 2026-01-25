import {
  getAll,
  getById,
  create,
  deleteById,
  upData,
  getUserByEmail
} from "../config/user.dao.js";

export const getAllUsers = async () => {
  return getAll();
};

export const getByIdUsers = async (id) => {
  const user = await getById(id);

  if (!user) {
    throw new Error("usuario no encontrado");
  }

  return user;
};

export const createUser = async (data) => {
  const { first_name, last_name, age, email, password, role } = data;

  if (!first_name || !last_name || !email || !password) {
    throw new Error("firstName, lastName, email y password son obligatorios");
  }

  const emailExist = await getUserByEmail(email);
  if (emailExist) {
    throw new Error(`el email ${email} ya está en uso`);
  }

  const user = await create({
    first_name,
    last_name,
    age,
    email,
    password,
    role
  });

  return user;
};

export const deleteUsers = async (id) => {
  return deleteById(id);
};

export const upDataUsers = async (id, data) => {
  return upData(id, data);
};
