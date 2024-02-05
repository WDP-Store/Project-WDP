import Category from "../model/Category.js";

const getAll = async (req, res) => {
  try {
    const data = await Category.find();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Get all failed: ${error}`)
  }
};

export default {
  getAll,
};
