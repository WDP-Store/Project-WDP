import { userRepository } from "../repositories/index.js";

const getAll = async (req, res) => {
  const users = await userRepository.getAll(req, res);
  console.log("users", users);
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await userRepository.getUserProfile(id);

    const referenceUser = {
      _id: userProfile._id,
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
    };
    return res.status(200).json(referenceUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get user profile failed: ${error.message}` });
  }
};

export default {
  getAll,
  getUserProfile,
};
