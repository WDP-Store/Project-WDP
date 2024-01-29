import express from "express";
import  { authController } from "../controllers/index.js";
const authRouter = express.Router();

authRouter.post("/register", authController.register);
 
export default authRouter;