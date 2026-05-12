import {
  getAllPets,
  getByIdPets,
  createPets,
  updatePets,
  deleteByIdPets
} from "../config/dao.js";

import logger from "../utils/logger.js";

// MOSTRAR TODOS
export const getPets = async () => {
  try {
    logger.info("Fetching all pets");

    return await getAllPets();
  } catch (error) {
    logger.error(`Error fetching pets: ${error.message}`);

    throw error;
  }
};

// MOSTRAR POR ID
export const getPetsById = async (pid) => {
  try {
    logger.info(`Fetching pet by id: ${pid}`);

    const pets = await getByIdPets(pid);

    if (!pets) {
      logger.warn(`Pet not found: ${pid}`);

      throw new Error("MASCOTA NO ENCONTRADA");
    }

    return pets;
  } catch (error) {
    logger.error(`Error fetching pet ${pid}: ${error.message}`);

    throw error;
  }
};

// CREAR PETS
export const createNewPets = async (data) => {
  try {
    logger.info(`Creating new pet: ${data.name || "unknown"}`);

    const pet = await createPets(data);

    logger.info(`Pet created successfully with id: ${pet._id}`);

    return pet;
  } catch (error) {
    logger.error(`Error creating pet: ${error.message}`);

    throw error;
  }
};

// MODIFICAR
export const updatePetsById = async (pid, data) => {
  try {
    logger.info(`Updating pet: ${pid}`);

    const updated = await updatePets(pid, data);

    if (!updated) {
      logger.warn(`Pet not found for update: ${pid}`);

      throw new Error("MASCOTA NO ENCONTRADA");
    }

    logger.info(`Pet updated successfully: ${pid}`);

    return updated;
  } catch (error) {
    logger.error(`Error updating pet ${pid}: ${error.message}`);

    throw error;
  }
};

// ELIMINAR
export const deletePetsById = async (pid) => {
  try {
    logger.info(`Deleting pet: ${pid}`);

    const deleted = await deleteByIdPets(pid);

    if (!deleted) {
      logger.warn(`Pet not found for delete: ${pid}`);

      throw new Error("MASCOTA NO ENCONTRADA");
    }

    logger.info(`Pet deleted successfully: ${pid}`);

    return deleted;
  } catch (error) {
    logger.error(`Error deleting pet ${pid}: ${error.message}`);

    throw error;
  }
};