import express from "express";
import  { brandController } from "../controllers/index.js";
const brandRouter = express.Router();

brandRouter.get("/all", brandController.findAll);
brandRouter.get("/", brandController.getAll);
brandRouter.get("/:id", brandController.findOne);
brandRouter.patch("/:id", brandController.update);
brandRouter.post("/", brandController.create);
 
export default brandRouter;