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

const findAll = async (req, res) => {
  try {
    const { page, name } = req.query;

    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };

    // let sort = {};

    const data = await Category.paginate(query, {
      page: page || 1,
      limit: 5,
      // sort: {
      //   ...sort,
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
    const result = await Category.findById(id);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOne: " + error);
  }
};

const create = async (category) => {
  try {
    const result = await Category.create(category);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create: " + error);
  }
};

const update = async (id, category) => {
  try {
    const result = await Category.findByIdAndUpdate(id, category);

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
