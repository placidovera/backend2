import { User } from "../models/user.model.js";
import { Pets } from "../models/Pets.js";

/* USERS */
export const getAll = async () => User.find().lean();

export const getById = async (id) => User.findById(id);

export const create = async (data) => User.create(data);

export const deleteById = async (id) => User.findByIdAndDelete(id);

export const upData = async (id, data) => User.findByIdAndUpdate(id, data, { new: true });

export const getUserByEmail = async (email) => User.findOne({ email }).select("+password");;



/* PETS */
export const getAllPets = async () => Pets.find().lean();

export const getByIdPets = async (id)=> Pets.findById(id).lean();

export const createPets = async (data) => Pets.create(data);

export const deleteByIdPets = async (id) => Pets.findByIdAndDelete(id);

export const updatePets = async (id, data) => Pets.findByIdAndUpdate(id, data, { new: true });

