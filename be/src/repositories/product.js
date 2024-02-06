import Product from "../model/Product.js";

const findAll = async (req, res) => {
  try {
    const { page, status, category, name } = req.query;

    const query = {};
    if (status !== undefined) query.status = status === "true";
    if (category) query.category = category;
    if (name) query.name = { $regex: name, $options: "i" };

    const data = await Product.paginate(query, {
      populate: ['category', 'brand'],
      page: page || 1,
      limit: 2,
      sort: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findAll: " + error);
  }
};

const findOne = async (id) => {
  try {
    const result = await Product.findById(id).populate(["category", "brand"]);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOne: " + error);
  }
};

const create = async (product) => {
  try {
    const result = await Product.create(product);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create: " + error);
  }
};

const update = async (id, product) => {
  try {
    const result = await Product.findByIdAndUpdate(id, product);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update: " + error);
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await Product.findByIdAndDelete(id).populate("category");

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't delete: " + error);
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
  deleteProduct,
};
