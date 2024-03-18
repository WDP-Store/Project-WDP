import Order from "../model/Order.js";
import Status from "../model/Status.js";

const findAll = async (req, res) => {
  try {
    const { page, user, status, date_s, name, id, _sort, _order } = req.query;

    const query = {};
    if (status !== undefined) query.status = status === "true";
    if (user) query.user = user;
    if (id) query._id = id;
    if (status) query.status = status;
    if (name) query.name = { $regex: name, $options: "i" };

    let sort = {};
    if (_sort) {
      sort[_sort] = _order === "desc" ? -1 : 1;
    } else {
      sort = { createdAt: "desc" };
    }

    const data = await Order.paginate(query, {
      populate: ["user", "status"],
      page: page || 1,
      limit: 10,
      sort,
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
const findOrderByName = async (name) => {
  try {
    // Bước 1: Tìm id của status dựa trên name
    const status = await Status.findOne({ name: name });
    if (!status) {
      throw new Error(`Status with name ${name} not found`);
    }
    console.log(status);

    // Bước 2: Tìm các order có statusId tương ứng
    const orders = await Order.find({ status: status._id }).populate("status");
    console.log(orders);
    return orders;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't find orders by status name: " + error);
  }
};
const changeStatusByOrderId = async (id, status) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    order.status = status;
    await order.save();
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't change status: " + error);
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
  findOrderByName,
  changeStatusByOrderId,
};
