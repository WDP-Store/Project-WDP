import express from "express";
import { userController } from "../controllers/index.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();
//ưu tiên vị trí
userRouter.post("/forgot-password", userController.handleForgotPassword);
userRouter.get("/", userController.getAll);
userRouter.get("/:id", verifyToken.checkLogin, userController.getUserProfile);
userRouter.patch("/:id", userController.updateUser);

export default userRouter;
