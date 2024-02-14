import { authRepository } from "../repositories/index.js";
import authValidation from "../validations/auth.js";
const register = async (req, res) => {
  try {
    console.log("controller: register =>", req.body);
    const { error } = authValidation.validateRegister(req.body);
    console.log(error);
    if (error) {
      console.log(error.details);
      // throw new Error(error);
      const validationErrors = {};
      for (let item of error.details) {
        if (!validationErrors[item.context.key]) {
          validationErrors[item.context.key] = [];
        }
        validationErrors[item.context.key].push(item.message);
      }
      console.log(validationErrors);

      return res.status(400).json(validationErrors);
      // return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authRepository.register(req.body);
    res.status(201).json({
      message: "User registered successfully",
      data: user ? user : null,
    });
  } catch (error) {
    console.log(error);
    console.log("check error duplicated => ", error.message);
    if (error.message === "DUPLICATE") {
      return res.status(400).json({
        message: "User registration duplicate",
      });
    }
    return res.status(500).json({
      message: "User registration failed",
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("controller => login");
    const { error } = authValidation.validateLogin(req.body);
    if (error) {
      console.log(error.details);
      // throw new Error(error);
      const validationErrors = {};
      for (let item of error.details) {
        if (!validationErrors[item.context.key]) {
          validationErrors[item.context.key] = [];
        }
        validationErrors[item.context.key].push(item.message);
      }
      console.log(validationErrors);

      return res.status(400).json(validationErrors);
      // return res.status(400).json({ error: error.details[0].message });
    }

    const info = await authRepository.login(req.body);
    res.status(200).json({
      message: "Login successfully",
      data: info ? info : null,
    });
  } catch (error) {
    console.log(error);
    console.log("error login", error.message);
    res.status(500).json({ message: error.message, data: null });
  }
};

export default {
  register,
  login,
};
