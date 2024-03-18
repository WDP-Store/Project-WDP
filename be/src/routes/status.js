import express from "express";
import  { statusController } from "../controllers/index.js";

const statusRouter = express.Router();

statusRouter.get("/", statusController.getAll);
 
export default statusRouter;