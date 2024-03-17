import { getPublicId } from "../config/getPublicId.js";
import Blog from "../model/Blog.js";
import { v2 as cloudinary } from 'cloudinary'

const findAll = async (req, res) => {
  try {
    const { page, category, name } = req.query;

    const query = {};
    if (category) query.category = category;
    if (name) query.title = { $regex: name, $options: "i" };

    const data = await Blog.paginate(query, {
      populate: ['category'],
      page: page || 1,
      limit: 4,
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

const list = async (req, res) => {
  try {
    const { page, category, title } = req.query;
    console.log("29_query", page, category, title);
    const query = {};
    if (category) query.category = category;
    if (title) query.title = { $regex: title, $options: "i" };

    const data = await Blog.paginate(query, {
      populate: ['category'],
      page: page || 1,
      limit: 10,
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
    const result = await Blog.findById(id).populate(["category"]);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOne: " + error);
  }
};

const create = async (blog) => {
  try {
    const result = await Blog.create(blog);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create: " + error);
  }
};

const update = async (id, blog) => {
  try {
    const result = await Blog.findByIdAndUpdate(id, blog);

    if (blog.image) {
      await cloudinary.uploader.destroy(getPublicId([result.image]));
    }

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update: " + error);
  }
};

const deleteBlog = async (id) => {
  try {
    const result = await Blog.findByIdAndDelete(id).populate("category");

    await cloudinary.uploader.destroy(getPublicId([result.image]));
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
  deleteBlog,
  list
};
