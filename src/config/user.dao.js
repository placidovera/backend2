import {User} from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";

export const getAll = async ()=> User.find().lean()
export const getById = async (id)=> User.findById(id).lean()
export const create = async (data)=> User.create(data)
export const deleteById = async (id)=> User.findByIdAndDelete(id)
export const upData = async (id,data)=> User.findByIdAndUpdate(id,data,{ new: true })
export const getUserByEmail = async (email) => User.findOne({ email })


export const getAllCart = async ()=> Cart.find().lean()
export const getByIdCart = async (id)=> Cart.findById(id).lean()
export const createCart = async (data)=> Cart.create(data)
export const deleteByIdCart = async (id)=> Cart.findByIdAndDelete(id)
export const upDataCart = async (id,data)=> Cart.findByIdAndUpdate(id,data,{ new: true })
