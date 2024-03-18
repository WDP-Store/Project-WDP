import express, { json } from "express";
import { productController } from "../controllers/index.js";
const productRouter = express.Router();
import check from "../middlewares/verifyToken.js"

//demo check login will access page
// productRouter.get("/", productController.findAll);
//demo check login + role admin will access page
// productRouter.get("/", checkLogin, checkAdmin, productController.findAll);
productRouter.get("/", productController.findAll);
productRouter.get("/fe", productController.fetchProducts);
productRouter.get("/:id", productController.findOne);
productRouter.patch("/:id", check.checkLogin, check.checkAdmin, productController.update);
productRouter.delete("/:id", check.checkLogin, check.checkAdmin, productController.deleteProduct);
productRouter.post("/", check.checkLogin, check.checkAdmin, productController.create);

export default productRouter;
