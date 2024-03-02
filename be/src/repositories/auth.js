import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken = (user) => {
  return jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ data: user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
};

const login = async (data) => {
  try {
    const { email, password } = data;
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchPassword) {
      throw { message: "Invalid password", status: 401 };
    }

    // Kiểm tra xem existingUser có tồn tại _id không trước khi truy cập
    if (!existingUser._id) {
      throw { message: "User does not have _id", status: 401 };
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    return {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

const register = async (data) => {
  try {
    const { name, email, password } = data;
    //check duplicated (exec() hỗ trợ chuyển Query Object -> Promisse)
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) throw { message: "DUPLICATE", status: 400 };
    //hashed password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    //insert to db
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("new user => ", newUser);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  login,
  register,
};
