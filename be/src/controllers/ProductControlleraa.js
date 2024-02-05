import { productRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  console.log()
  const products = await productRepository.getAll(req, res);
  res.status(200).json(products);
};

export default {
  getAll,
};
