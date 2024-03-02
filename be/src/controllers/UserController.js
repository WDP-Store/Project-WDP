import { userRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  const users = await userRepository.getAll(req, res);
  console.log("users", users);
};
const getUserProfile = async (req, res) => {
  try {
    const userInfor = req.user;
    return res.status(200).json(userInfor);
  } catch (error) {
    throw new Error(`Get user profile failed: ${error}`);
  }
};

export default {
  getAll,
  getUserProfile,
};
