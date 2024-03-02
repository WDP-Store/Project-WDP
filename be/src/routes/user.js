import express from "express";
import { userController } from "../controllers/index.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", verifyToken.checkLogin, userController.getUserProfile);

export default userRouter;
