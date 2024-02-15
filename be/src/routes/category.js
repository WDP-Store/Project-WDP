import express from "express";
import  { categoryController } from "../controllers/index.js";
const categoryRouter = express.Router();

categoryRouter.get("/all", categoryController.findAll);
categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:id", categoryController.findOne);
categoryRouter.patch("/:id", categoryController.update);
categoryRouter.post("/", categoryController.create);
 
export default categoryRouter;