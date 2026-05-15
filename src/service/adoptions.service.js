import { Adoption } from "../models/adoptions.model.js";
import { Pets } from "../models/Pets.js";
import logger from "../utils/logger.js";

// MOSTRAR TODAS
export const getAdoptions = async () => {
  try {
    logger.info("Fetching all adoptions");
    return await Adoption.find().populate("owner pet").lean();
  } catch (error) {
    logger.error(`Error fetching adoptions: ${error.message}`);
    throw error;
  }
};

// MOSTRAR POR ID
export const getAdoptionById = async (aid) => {
  try {
    logger.info(`Fetching adoption by id: ${aid}`);

    const adoption = await Adoption.findById(aid)
      .populate("owner pet")
      .lean();

    if (!adoption) {
      logger.warn(`Adoption not found: ${aid}`);
      throw new Error("ADOPCION NO ENCONTRADA");
    }

    return adoption;

  } catch (error) {
    logger.error(`Error fetching adoption ${aid}: ${error.message}`);
    throw error;
  }
};

// CREAR ADOPCIÓN (BLOQUEADA 100%)
export const createNewAdoption = async (data) => {
  try {
    logger.info("Creating adoption");

    // 🔥 1. Buscar mascota
    const pet = await Pets.findById(data.pet);

    if (!pet) {
      throw new Error("MASCOTA NO ENCONTRADA");
    }

    // 🔥 2. BLOQUEO REAL (evita duplicados)
    if (pet.status === "adoptado") {
      throw new Error("LA MASCOTA YA FUE ADOPTADA");
    }

    // 🔥 3. MARCAR COMO ADOPTADA ANTES DE CREAR ADOPTION
    pet.status = "adoptado";
    await pet.save();

    // 🔥 4. CREAR ADOPCIÓN
    const adoption = await Adoption.create({
      owner: data.owner,
      pet: data.pet
    });

    logger.info("Adoption created successfully");

    return adoption;

  } catch (error) {
    logger.error(`Error creating adoption: ${error.message}`);
    throw error;
  }
};