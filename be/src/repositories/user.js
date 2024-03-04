import user from "../model/User.js";

const getAll = async (req, res) => {
  try {
    const test = await user.find();
    return test;
  } catch (error) {
    console.log("");
  }
};

const getUserProfile = async (id) => {
  try {
    const userProfile = await user.findById(id);
    return userProfile;
  } catch (error) {
    throw new Error(`Get user profile failed: ${error}`);
  }
};

export default {
  getAll,
  getUserProfile,
};
