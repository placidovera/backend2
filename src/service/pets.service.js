import {
  getAllPets,
  getByIdPets,
  createPets,
  updatePets,
  deleteByIdPets
} from "../config/dao.js";

//MOSTRAR TODOS

export const getPets = async () => {
  try {
    return await getAllPets();
  } catch (error) {
    throw error;
  }
};

//MOSTRAR POR ID

export const getPetsById = async (pid) => {
  try {
    const pets = await getByIdPets(pid);
    if (!pets) throw new Error("MASCOTA NO ENCONTRADA");
    return pets;
  } catch (error) {
    throw error;
  }
};

//CREAR PETS
export const createNewPets = async (data) => {
  try {
    return await createPets(data);
  } catch (error) {
    throw error;
  }
};

//MODIFICAR 
export const updatePetsById = async (pid, data) => {
  try {
    const updated = await updatePets(pid, data);
    if (!updated) throw new Error("MASCOTA NO ENCONTRADA");
    return updated;
  } catch (error) {
    throw error;
  }
};

//ELIMINAR 
export const deletePetsById = async (pid) => {
  const deleted = await deleteByIdPets(pid);
  if (!deleted) throw new Error("MASCOTA NO ENCONTRADA");
  return deleted;
};
