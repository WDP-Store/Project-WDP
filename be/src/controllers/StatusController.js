import { statusRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  try {
    const status = await statusRepository.getAll(req, res);
    
    res.status(200).json(status);
  } catch (error) {
    throw new Error(`Get all status error: ${error}`);
  }
};

export default {
  getAll,
};
