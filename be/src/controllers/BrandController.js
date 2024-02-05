import { brandRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  try {
    const brands = await brandRepository.getAll(req, res);
    
    res.status(200).json(brands);
  } catch (error) {
    throw new Error(`Get all brand error: ${error}`);
  }
};

export default {
  getAll,
};
