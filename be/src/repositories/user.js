import User from "../model/User.js";
import bcrypt from "bcrypt";


const findAll = async (req, res) => {
  try {
    const { page, name, email, status } = req.query;
    console.log("6_query", page, name, email, status);
    const query = {};
    if (status !== undefined) query.status = status === "true";
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" }; //$regex khớp 1 phần field email, "i" không phân biệt hoa-thường

    const options = {
      page: page || 1,
      limit: 5,
      sort: {
        createdAt: "desc",
      },
    };
    const users = await User.paginate(query, options);
    return users;
  } catch (error) {
    throw new Error(`Can't get all customers: ${error}`);
  }
};

const countAll = async (req, res) => {
  try {
    const { status } = req.query;

    const query = {};
    if (status !== undefined) query.status = status === "true";

    const users = await User.countDocuments({
      ...query
    });
    return users;
  } catch (error) {
    throw new Error(`Can't get all customers: ${error}`);
  }
};

const getUserProfile = async (id) => {
  try {
    const userProfile = await User.findById(id);
    return userProfile;
  } catch (error) {
    throw new Error(`Get user profile failed: ${error}`);
  }
};

const findByEmail = async (email) => {
  console.log("22_repository");
  try {
    const user = await User.findOne({ email: email });
    console.log("25_repository", user);
    return user;
  } catch (error) {
    throw new Error(`Get user failed: ${error}`);
  }
};

const update = async (id, data) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(id, data, { new: true });
    return userUpdated;
  } catch (error) {
    throw new Error(`Get user failed: ${error}`);
  }
};
const replacePassword = async (id, data) => {
  try {

    const { currentPassword, newPassword, confirmPassword } = data;

    console.log("replace password", id, data);
    const user = await User.findOne({ _id: id });
    console.log("replace password", user);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    console.log("replace password", isMatch);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('New password not match confirm password');
    }



    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    const info = await user.save();
    console.log("user after update", info);

    return info;
  } catch (error) {
    throw new Error(`Get user failed: ${error}`);
  }
};



export default {
  findAll,
  getUserProfile,
  findByEmail,
  update,
  replacePassword,
  countAll
};
