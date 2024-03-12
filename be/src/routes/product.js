import express, { json } from "express";
import { productController } from "../controllers/index.js";
const productRouter = express.Router();

//demo check login will access page
// productRouter.get("/", checkLogin, productController.findAll);
//demo check login + role admin will access page
// productRouter.get("/", checkLogin, checkAdmin, productController.findAll);
productRouter.get("/", productController.findAll);
productRouter.get("/fe", productController.fetchProducts);
productRouter.get("/:id", productController.findOne);
productRouter.patch("/:id", productController.update);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.post("/", productController.create);

export default productRouter;
