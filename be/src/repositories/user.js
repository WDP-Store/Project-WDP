import user from "../model/User.js";

const getAll = async (req, res) => {
  try {
    const test = await user.find();
    return test;
  } catch (error) {
    console.log("");
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await user.findById(req.user._id);
    return user;
  } catch (error) {
    throw new Error(`Get user profile failed: ${error}`);
  }
};

export default {
  getAll,
  getUserProfile,
};
