import { brandRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  try {
    const brands = await brandRepository.getAll(req, res);
    
    res.status(200).json(brands);
  } catch (error) {
    throw new Error(`Get all brand error: ${error}`);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await brandRepository.findAll(req, res);
    
    res.status(200).json(data);
  } catch (error) {
    throw new Error(`Get all brand error: ${error}`);
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id
    const data = await brandRepository.findOne(id);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const create = async (req, res) => {
  try {
    const brand = req.body;
    const data = await brandRepository.create(brand)

    return res.status(201).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = req.body;
    const data = await brandRepository.update(id, brand)

    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

export default {
  getAll,
  findAll,
  create,
  findOne,
  update,
};
