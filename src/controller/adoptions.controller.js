// src/controllers/adoptions.controller.js
import {
  getAdoptions,
  getAdoptionById,
  createNewAdoption
} from "../service/adoptions.service.js";

/* GET ALL */
export const getAdoptionsController = async (req, res) => {
  try {
    const result = await getAdoptions();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET BY ID */
export const getAdoptionByIdController = async (req, res) => {
  try {
    const adoption = await getAdoptionById(req.params.aid);
    res.json(adoption);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* CREATE ADOPTION */
export const createAdoptionController = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    // Solo registro en DB: pasa el objeto que quieras
    const adoption = await createNewAdoption({ owner: uid, pet: pid });

    res.status(201).json({
      message: "Pet adopted",
      adoption
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};