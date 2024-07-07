import Brand from "../model/Brand.js";

const getAll = async (req, res) => {
  try {
    const brand = await Brand.find();

    return brand;
  } catch (error) {
    console.log(error);
    throw new Error(`Get all failed: ${error}`);
  }
};

const findAll = async (req, res) => {
  try {
    const { page, name } = req.query;

    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };


    const data = await Brand.paginate(query, {
      page: page || 1,
      limit: 5,
      // sort: {
      //   createdAt: "desc",
      // },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findAll: " + error);
  }
};

const findOne = async (id) => {
  try {
    const result = await Brand.findById(id);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOne: " + error);
  }
};

const create = async (category) => {
  try {
    const result = await Brand.create(category);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create: " + error);
  }
};

const update = async (id, category) => {
  try {
    const result = await Brand.findByIdAndUpdate(id, category);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update: " + error);
  }
};

export default {
  getAll,
  create,
  findAll,
  findOne,
  update,
};
