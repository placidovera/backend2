import {User} from "../models/user.model.js";

export const getAll = async ()=> User.find().lean()
export const getById = async (id)=> User.findById(id).lean()
export const create = async (data)=> User.create(data)
export const deleteById = async (id)=> User.findByIdAndDelete(id)
export const upData = async (id,data)=> User.findByIdAndUpdate(id,data,{ new: true })
export const getUserByEmail = async (email) => User.findOne({ email })
