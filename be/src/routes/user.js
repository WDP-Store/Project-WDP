import express from "express";
import UserController from "../controllers/UserController.js";
const userRouter = express.Router();

userRouter.use("/", UserController.getAll);
 
export default userRouter;