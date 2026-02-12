import bcrypt from "bcrypt";
import {
  getAll,
  getById,
  create,
  deleteById,
  upData,
  getUserByEmail
} from "../config/dao.js";

//USERS
export const getAllUsers = async () => {
  return getAll();
};

export const getByIdUsers = async (id) => {
  const user = await getById(id);
  if (!user) throw new Error("usuario no encontrado");
  return user;
};

export const createUser = async (data) => {
  const { first_name,email, password, role } = data;

  if (!first_name || !email || !password) {
    throw new Error("firstName, email y password son obligatorios");
  }

  const emailExist = await getUserByEmail(email);
  if (emailExist) {
    throw new Error(`el email ${email} ya está en uso`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await create({
    first_name,
    email,
    password: hashedPassword,
    role
  });

  return user;
};

//LOGIN
export const loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("email y password son obligatorios");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("credenciales inválidas");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("credenciales inválidas");
  }

  return user; 
};

// DELETE / UPDATE
export const deleteUsers = async (id) => {
  return deleteById(id);
};

export const upDataUsers = async (id, data) => {
  return upData(id, data);
};
