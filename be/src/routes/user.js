import express from "express";
import { userController } from "../controllers/index.js";
import check from "../middlewares/verifyToken.js"

const userRouter = express.Router();
//ưu tiên vị trí
userRouter.post("/forgot-password", userController.handleForgotPassword);
userRouter.post("/verify-otp", userController.handleCheckOTP);
userRouter.patch("/change-password/:id", userController.changePassword);
userRouter.get("/", userController.getAll);
userRouter.get("/:id", check.checkLogin, userController.getUserProfile);
userRouter.patch("/:id", userController.updateUser);
// userRouter.patch("/:id", check.checkLogin, userController.updateUser);

export default userRouter;
