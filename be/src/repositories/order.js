import Order from "../model/Order.js";

const findAll = async (req, res) => {
  try {
    const { page, user, status, date_s, name } = req.query;

    const query = {};
    if (status !== undefined) query.status = status === "true";
    if (user) query.user = user;
    if (status) query.status = status;
    if (name) query.name = { $regex: name, $options: "i" };

    let sort = {};
    if (date_s) sort = { price: date_s };

    const data = await Order.paginate(query, {
      populate: ["user", "status"],
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

const findOne = async (id) => {
  try {
    const result = await Order.findById(id).populate(["user", "status"]);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOne: " + error);
  }
};

const findOneByOrderVnpayId = async (orderVnpayId) => {
  try {
    const result = await Order.findOne({
      orderVnpayId,
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOne: " + error);
  }
};

const create = async (order) => {
  try {
    const result = await Order.create(order);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create: " + error);
  }
};

const update = async (id, product) => {
  try {
    const result = await Order.findByIdAndUpdate(id, product);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update: " + error);
  }
};

const deleteOrder = async (id) => {
  try {
    const result = await Order.findByIdAndDelete(id);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't delete: " + error);
  }
};
const findOrderByUserId = async (id) => {
  try {
    const result = await Order.find({ user: id }).populate("status");
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't findOrder: " + error);
  }
};

export default {
  create,
  findAll,
  findOne,
  findOneByOrderVnpayId,
  update,
  deleteOrder,
  findOrderByUserId,
};
