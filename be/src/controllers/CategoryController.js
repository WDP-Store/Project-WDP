import { categoryRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  try {
    const data = await categoryRepository.getAll(req, res);
    
    res.status(200).json(data);
  } catch (error) {
    throw new Error(`Get all brand error: ${error}`);
  }
};

export default {
  getAll,
};
