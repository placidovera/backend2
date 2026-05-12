import bcrypt from "bcrypt";
import {
  getAll,
  getById,
  create,
  deleteById,
  upData,
  getUserByEmail
} from "../config/dao.js";

import logger from "../utils/logger.js";

// USERS
export const getAllUsers = async () => {
  try {
    logger.info("Fetching all users");

    return await getAll();
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    throw error;
  }
};

export const getByIdUsers = async (id) => {
  try {
    logger.info(`Fetching user by id: ${id}`);

    const user = await getById(id);

    if (!user) {
      logger.warn(`User not found: ${id}`);
      throw new Error("usuario no encontrado");
    }

    return user;
  } catch (error) {
    logger.error(`Error fetching user ${id}: ${error.message}`);
    throw error;
  }
};

// CREATE USER
export const createUser = async (data) => {
  try {
    const { first_name, email, password, isAdmin } = data;

    logger.info(`Creating user: ${email}`);

    if (!first_name || !email || !password) {
      logger.warn(`Invalid user payload: ${email}`);
      throw new Error("firstName, email y password son obligatorios");
    }

    const emailExist = await getUserByEmail(email);
    if (emailExist) {
      logger.warn(`Email already in use: ${email}`);
      throw new Error(`el email ${email} ya está en uso`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = isAdmin ? "admin" : "user";

    const user = await create({
      first_name,
      email,
      password: hashedPassword,
      role
    });

    logger.info(`User created successfully: ${email}`);

    return user;
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    throw error;
  }
};

// LOGIN
export const loginUser = async (data) => {
  try {
    const { email, password } = data;

    logger.info(`Login attempt: ${email}`);

    if (!email || !password) {
      logger.warn(`Missing login fields: ${email}`);
      throw new Error("email y password son obligatorios");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      logger.warn(`Login failed - user not found: ${email}`);
      throw new Error("credenciales inválidas");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      logger.warn(`Login failed - wrong password: ${email}`);
      throw new Error("credenciales inválidas");
    }

    logger.info(`Login successful: ${email}`);

    return user;
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    throw error;
  }
};

// DELETE
export const deleteUsers = async (id) => {
  try {
    logger.info(`Deleting user: ${id}`);

    const deleted = await deleteById(id);

    if (!deleted) {
      logger.warn(`User not found for delete: ${id}`);
      throw new Error("usuario no encontrado");
    }

    logger.info(`User deleted: ${id}`);

    return deleted;
  } catch (error) {
    logger.error(`Error deleting user ${id}: ${error.message}`);
    throw error;
  }
};

// UPDATE
export const upDataUsers = async (id, data) => {
  try {
    logger.info(`Updating user: ${id}`);

    const updated = await upData(id, data);

    if (!updated) {
      logger.warn(`User not found for update: ${id}`);
      throw new Error("usuario no encontrado");
    }

    logger.info(`User updated: ${id}`);

    return updated;
  } catch (error) {
    logger.error(`Error updating user ${id}: ${error.message}`);
    throw error;
  }
};