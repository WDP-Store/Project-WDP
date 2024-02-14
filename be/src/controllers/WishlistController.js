import { wishlistRepository } from '../repositories/index.js';


const findAll = async (req, res) => {
  try {
    const data = await wishlistRepository.findAll(req, res);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const create = async (req, res) => {
  try {
    const wishlist = req.body;
    const data = await wishlistRepository.create(wishlist)

    return res.status(201).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

const deleteWishlist = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await wishlistRepository.deleteWishlist(id)

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

export default {
  findAll,
  create,
  deleteWishlist,
}