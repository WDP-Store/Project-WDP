import express from "express";
import { productController } from "../controllers/index.js";
import {verifyAuthToken} from "../middlewares/verifyToken.js"
const productRouter = express.Router();

productRouter.get("/", verifyAuthToken, productController.findAll);
productRouter.get("/:id", productController.findOne);
productRouter.patch("/:id", productController.update);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.post("/", productController.create);

export default productRouter;