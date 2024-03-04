import { blogRepository } from '../repositories/index.js';

const findAll = async (req, res) => {
  console.log(req.headers)
  try {
    const data = await blogRepository.findAll(req, res);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}
const getAllBlogs = async (req, res) => {
  console.log(req.headers)
  try {
    const data = await blogRepository.list(req, res);

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
    const data = await blogRepository.findOne(id);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const create = async (req, res) => {
  try {
    const blog = req.body;
    const data = await blogRepository.create(blog)

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
    const blog = req.body;
    const data = await blogRepository.update(id, blog)

    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await blogRepository.deleteBlog(id)

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
  deleteBlog,
  getAllBlogs
}