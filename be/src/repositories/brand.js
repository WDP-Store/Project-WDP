import Brand from "../model/Brand.js";

const getAll = async (req, res) => {
  try {
    const brand = await Brand.find();

    return brand;
  } catch (error) {
    console.log(error);
    throw new Error(`Get all failed: ${error}`)
  }
};

export default {
  getAll,
};
