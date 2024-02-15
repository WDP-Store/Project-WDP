import { categoryRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  try {
    const data = await categoryRepository.getAll(req, res);
    
    res.status(200).json(data);
  } catch (error) {
    throw new Error(`Get all brand error: ${error}`);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await categoryRepository.findAll(req, res);
    
    res.status(200).json(data);
  } catch (error) {
    throw new Error(`Get all brand error: ${error}`);
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id
    const data = await categoryRepository.findOne(id);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const create = async (req, res) => {
  try {
    const cate = req.body;
    const data = await categoryRepository.create(cate)

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
    const cate = req.body;
    const data = await categoryRepository.update(id, cate)

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
