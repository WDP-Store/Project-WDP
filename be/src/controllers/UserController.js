import { userRepository } from "../repositories/index.js";
import nodemailer from "nodemailer";

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
    console.log("21_email", email);
    const userExisting = await userRepository.findByEmail(email);
    console.log("email already exists", userExisting);
    if (userExisting) {
      const token = Math.floor(10000 + Math.random() * 90000).toString();
      console.log("26_token", token);
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
        text: `You are receiving this email because you requested a password reset. Your token is: ${token}`, // Email body
      };

      //send mail
      await transporter.sendMail(mailOptions);
    }
    res.status(200).json(userExisting ? userExisting : null);
  } catch (error) {
    return res.status(500).json({
      message: "Can't reset password",
      data: null,
      error: error,
    });
  }
};

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
};
