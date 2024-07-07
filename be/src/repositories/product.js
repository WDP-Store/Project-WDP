import Product from "../model/Product.js";

const findAll = async (req, res) => {
  try {
    const { page, status, category, brand, name, featured, price_gte, price_lte, year, price_s, year_s, name_s, featured_s } = req.query;

    const query = {};
    if (status !== undefined) query.status = status === "true";
    if (category) query.category = category;
    if (year) query.year = year;
    if (brand) query.brand = brand;
    if (featured) query.featured = featured;
    if (name) query.name = { $regex: name, $options: "i" };
    if (price_gte) query.price = { $gte: Number(price_gte) };
    if (price_lte) query.price = { $lte: Number(price_lte) };
    if (price_gte && price_lte) query.price = { $gte: Number(price_gte), $lte: Number(price_lte) };

    let sort = {};
    if (price_s) sort = { price: price_s };
    if (year_s) sort = { year: year_s };
    if (name_s) sort = { name: name_s };
    if (featured_s) sort = { featured: featured_s };

    const data = await Product.paginate(query, {
      populate: ['category', 'brand'],
      page: page || 1,
      limit: 10,
      sort: {
        ...sort,
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findAll: " + error);
  }
};

const fetchAll = async (req, res) => {
  try {
    const result = await Product.find().populate(["category", "brand"]);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch all products: " + error);
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
  fetchAll
};
