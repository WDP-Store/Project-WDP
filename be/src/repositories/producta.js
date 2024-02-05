import Product from "../model/Product.js";

const getAll = async (req, res) => {
  try {
    const { page, status, category, name } = req.query;
    console.log("page");
    console.log(page);
    console.log(status);
    console.log(typeof status == "boolean");
    console.log(category);
    console.log(name);
    const query = {};
    if (status !== undefined) query.status = status === 'true'; // Or whatever your boolean logic needs to be
  if (category) query.category = { $regex: category, $options: "i" };
  if (name) query.name = { $regex: name, $options: "i" };

    const test = await Product.paginate(
      {
        // status: { $regex: status, $options: "i" },
        // category: { $regex: category, $options: "i" },
        // status: undefined,
        // year: 2022,
        // price: { $gte: 1099.99, $lte: 1999 },
        name: { $regex: name, $options: "i" },
      },
      {
        page: page || 1,
        limit: 2,
        sort: {
          createdAt: "desc",
        },
      }
    );
    return test;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAll,
};
