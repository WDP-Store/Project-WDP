import express from "express";
import  { brandController } from "../controllers/index.js";
import check from "../middlewares/verifyToken.js"

const brandRouter = express.Router();

brandRouter.get("/all", brandController.findAll);
brandRouter.get("/", brandController.getAll);
brandRouter.get("/:id", brandController.findOne);
brandRouter.patch("/:id",check.checkLogin, check.checkAdmin, brandController.update);
brandRouter.post("/",check.checkLogin, check.checkAdmin, brandController.create);
 
export default brandRouter;