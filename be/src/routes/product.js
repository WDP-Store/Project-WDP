import express from "express";
import { productController } from "../controllers/index.js";

const productRouter = express.Router();


productRouter.get("/", productController.findAll);
productRouter.post("/", productController.create);

export default productRouter;