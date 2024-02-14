import Wishlist from "../model/Wishlist.js";

const findAll = async (req, res) => {
  try {
    const { page, product, user } = req.query;

    const query = {};
    if (product) query.product = product;
    if (user) query.user = user;

    const data = await Wishlist.paginate(query, {
      populate: ['user', 'product'],
      page: page || 1,
      limit: 100,
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

const create = async (data) => {
  try {
    const result = await Wishlist.create(data);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create: " + error);
  }
};

const deleteWishlist = async (id) => {
  try {
    const result = await Wishlist.findByIdAndDelete(id);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't delete: " + error);
  }
};

export default {
  create,
  findAll,
  deleteWishlist,
};
