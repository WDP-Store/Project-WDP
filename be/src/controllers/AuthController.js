import { authRepository } from "../repositories/index.js";
import authValidation from "../validations/auth.js";
const register = async (req, res) => {
  try {
    const { error } = authValidation.validateRegister(req.body);
    if (error) {
      // throw new Error(error);
      const validationErrors = {};
      for (let item of error.details) {
        if (!validationErrors[item.context.key]) {
          validationErrors[item.context.key] = [];
        }
        validationErrors[item.context.key].push(item.message);
      }
      return res.status(400).json(validationErrors);
      // return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authRepository.register(req.body);
    res.status(201).json({
      message: "User registered successfully",
      data: user ? user : null,
    });
  } catch (error) {
    if (error.message === "DUPLICATE") {
      return res.status(400).json({
        message: "User registration duplicate",
        data: null
      });
    }
    return res.status(500).json({
      message: "User registration failed",
      data: null
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = authValidation.validateLogin(req.body);
    if (error) {
      // throw new Error(error);
      const validationErrors = {};
      for (let item of error.details) {
        if (!validationErrors[item.context.key]) {
          validationErrors[item.context.key] = [];
        }
        validationErrors[item.context.key].push(item.message);
      }
      return res.status(400).json(validationErrors);
      // return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authRepository.login(req.body);
    res.status(200).json(
      {id:user._doc._id , name: user._doc.name, email: user._doc.email, role: user._doc.role, accessToken: user.accessToken, refreshToken: user.refreshToken},
    );
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

export default {
  register,
  login,
};
