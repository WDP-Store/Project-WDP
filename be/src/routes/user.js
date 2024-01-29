import express from "express";
import  { userController } from "../controllers/index.js";
const userRouter = express.Router();

userRouter.get("/", userController.getAll);
 
export default userRouter;