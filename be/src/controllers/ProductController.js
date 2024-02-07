// import { v2 as cloudinary } from 'cloudinary'

import { productRepository } from '../repositories/index.js';


const findAll = async (req, res) => {
  try {
    const data = await productRepository.findAll(req, res);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const findOne = async (req, res) => {
  try {
    const id = req.params.id
    const data = await productRepository.findOne(id);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const create = async (req, res) => {
  try {
    const product = req.body;
    const data = await productRepository.create(product)

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
    const product = req.body;
    const data = await productRepository.update(id, product)

    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productRepository.deleteProduct(id)

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

export default {
  findAll,
  findOne,
  create,
  update,
  deleteProduct,
}