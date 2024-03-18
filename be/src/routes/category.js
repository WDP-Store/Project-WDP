import express from "express";
import  { categoryController } from "../controllers/index.js";
import check from "../middlewares/verifyToken.js"

const categoryRouter = express.Router();

categoryRouter.get("/all", categoryController.findAll);
categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:id", categoryController.findOne);
categoryRouter.patch("/:id", check.checkLogin, check.checkAdmin, categoryController.update);
categoryRouter.post("/", check.checkLogin, check.checkAdmin, categoryController.create);
 
export default categoryRouter;