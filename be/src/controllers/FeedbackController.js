// import { v2 as cloudinary } from 'cloudinary'

import { feedbackRepository } from '../repositories/index.js';

const findAll = async (req, res) => {
  try {
    const data = await feedbackRepository.findAll(req, res);

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
    const data = await feedbackRepository.findOne(id);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const create = async (req, res) => {
  try {
    const feedback = req.body;
    const data = await feedbackRepository.create(feedback)

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
    const feedback = req.body;
    const data = await feedbackRepository.update(id, feedback)

    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const deleteFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await feedbackRepository.deleteFeedback(id)

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
  deleteFeedback,
}