import { userRepository } from "../repositories/index.js";
import nodemailer from "nodemailer";
import User from "../model/User.js";
import bcrypt from "bcrypt";

const getAll = async (req, res) => {
  console.log("GetAllUserController");
  try {
    const data = await userRepository.findAll(req, res);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const countAll = async (req, res) => {
  try {
    const users = await userRepository.countAll(req, res);
    console.log("users",users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
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

const handleForgotPassword = async (req, res) => {
  console.log("ForgotPasswordController");
  try {
    const { email } = req.body;

    // Check if the user exists
    const userExisting = await userRepository.findByEmail(email);
    if (!userExisting) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token and set expiration time
    const token = Math.floor(10000 + Math.random() * 90000).toString();
    const tokenExpiration = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now

    // Update user with token and expiration time
    userExisting.token = token;
    userExisting.tokenExpiration = tokenExpiration;
    await userExisting.save();

    // Send email with token
    const transporter = nodemailer.createTransport({
      service: "gmail", // Specify your email service provider
      auth: {
        user: "binancebozz@gmail.com", // Your email address
        pass: "bhgp xhig uomm fmbx", // Your email password
      },
    });

    const mailOptions = {
      from: "binancebozz@gmail.com", // Sender's email address
      to: email, // Recipient's email address
      subject: "Verify code to your account SND-STORE", // Email subject
      text: `You are receiving this email because you requested a password reset. Your code is: ${token}`, // Email body
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    // Respond with the updated user
    res.status(200).json(userExisting);
  } catch (error) {
    return res.status(500).json({
      message: "Can't reset password",
      data: null,
      error: error,
    });
  }
};

const changePassword = async (req, res) => {
  console.log("ChangePasswordController");
  try {
    const { id } = req.params;
    console.log("ChangePasswordController data", req.body, id);
    const data = await userRepository.replacePassword(id, req.body);
    console.log("data2", data);
    if (!data) {

    }
    res.status(200).json({
      code: 200,
      message: "Change password successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
const handleCheckOTP = async (req, res) => {
  console.log("CheckOTPController");
  try {
    const { email, otp } = req.body;
    console.log("CheckOTPController", req.body);
    console.log("CheckOTPController2", otp, email);

    const user = await User.findOne({ email });
    if (!user || user.token !== otp || user.tokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }



    const password = generateRandomPassword();
    const hashedPassword = bcrypt.hashSync(password, 10);

    user.token = undefined;
    user.tokenExpiration = undefined;
    user.password = hashedPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail", // Specify your email service provider
      auth: {
        user: "binancebozz@gmail.com", // Your email address
        pass: "bhgp xhig uomm fmbx", // Your email password
      },
    });

    const mailOptions = {
      from: "binancebozz@gmail.com", // Sender's email address
      to: email, // Recipient's email address
      subject: "Verify code to your account SND-STORE", // Email subject
      text: `You are receiving this email because you requested a password reset. Your password is: ${password}`, // Email body
    };

    //send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Please check email to get new password",
      // data: data, // Chỉ trả về các trường name, email, role và id
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

function generateRandomPassword() {
  const length = 6;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}

const updateUser = async (req, res) => {
  console.log("UpdateUserController");
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedUser = await userRepository.update(id, data);
    const { name, email, role, id: _id } = updatedUser; // Destructuring để lấy các trường cần thiết
    res.status(200).json({
      message: "Update user successfully",
      data: { name, email, role, id: _id }, // Chỉ trả về các trường name, email, role và id
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

export default {
  getAll,
  getUserProfile,
  handleForgotPassword,
  updateUser,
  changePassword,
  handleCheckOTP,
  countAll,
};
