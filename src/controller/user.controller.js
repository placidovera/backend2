import {
  getAllUsers,
  getByIdUsers,
  createUser,
  deleteUsers,
  upDataUsers
} from "../service/users.service.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdUsersController = async (req, res) => {
  try {
    const user = await getByIdUsers(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const upDataUsersController = async (req, res) => {
  try {
    const user = await upDataUsers(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteUsersController = async (req, res) => {
  try {
    await deleteUsers(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
