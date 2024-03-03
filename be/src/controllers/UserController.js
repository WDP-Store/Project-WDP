import { userRepository } from "../repositories/index.js";
import nodemailer from "nodemailer";

const getAll = async (req, res) => {
  console.log('GetAllUserController');
  try {
    const data = await userRepository.findAll(req, res);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
};
const getUserProfile = async (req, res) => {
  try {
    const userInfor = req.user;
    return res.status(200).json(userInfor);
  } catch (error) {
    throw new Error(`Get user profile failed: ${error}`);
  }
};

const handleForgotPassword = async (req, res) => {
  console.log('ForgotPasswordController');
  try {
    const { email } = req.body;
    console.log("21_email", email)
    const userExisting = await userRepository.findByEmail(email);
    console.log("email already exists", userExisting)
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

const updateUser = async(req, res) => {
  console.log('UpdateUserController');
  try {
    const id = req.params.id;
    const data = req.body;
    const users = await userRepository.update(id, data);
    console.log('67_UpdateUserController', users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.toString()
    })
  }
}

export default {
  getAll,
  getUserProfile,
  handleForgotPassword,
  updateUser
};
