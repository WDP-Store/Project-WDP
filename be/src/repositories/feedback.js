import Feedback from "../model/Feedback.js";

const findAll = async (req, res) => {
  try {
    const { page, product, rating } = req.query;

    const query = {};
    if (product) query.product = product;
    if (rating) query.rating = rating;

    const data = await Feedback.paginate(query, {
      populate: ["user", "product"],
      page: page || 1,
      limit: 3,
      sort: {
        createdAt: "desc",
      },
    });

    const newData = data.docs.map((item) => {
      return {
        _id: item._id,
        user: item.user.name,
        name: item.name,
        email: item.email,
        rating: item.rating,
        comment: item.comment,
        product: item.product,
      };
    });

    return newData;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findAll: " + error);
  }
};

const findOne = async (id) => {
  try {
    const result = await Feedback.findById(id);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOne: " + error);
  }
};

const create = async (product) => {
  try {
    const result = await Feedback.create(product);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create: " + error);
  }
};

const update = async (id, product) => {
  try {
    const result = await Feedback.findByIdAndUpdate(id, product);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update: " + error);
  }
};

const deleteFeedback = async (id) => {
  try {
    const result = await Feedback.findByIdAndDelete(id).populate("category");

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
  deleteFeedback,
};
