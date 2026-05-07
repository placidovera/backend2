import {
  getPets,
  getPetsById,
  createNewPets,
  updatePetsById,
  deletePetsById
} from "../service/pets.service.js";

export const getPetsController = async (req, res) => {
  try {
    res.json(await getPets());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPetsByIdController = async (req, res) => {
  try {
    res.json(await getPetsById(req.params.pid));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPetsController = async (req, res) => {
  try {
    res.status(201).json(await createNewPets(req.body));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePetsController = async (req, res) => {
  try {
    res.json(
      await updatePetsById(req.params.pid, req.body)
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePetsController = async (req, res) => {
  try {
    res.json(await deletePetsById(req.params.pid));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
