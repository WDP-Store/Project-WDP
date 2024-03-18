import express from "express";
import { orderController } from "../controllers/index.js";

const orderRouter = express.Router();

orderRouter.get("/", orderController.findAll);
orderRouter.post("/", orderController.create);
orderRouter.get("/vnpay-return", orderController.vnpayReturn);
orderRouter.post("/create-payment-url", orderController.createPaymentUrl);
orderRouter.get(
  "/find-by-order-vnpay-id/:orderVnpayId",
  orderController.findOneByOrderVnpayId
);
orderRouter.get("/:id", orderController.findOne);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.deleteOrder);
orderRouter.get(
  "/find-order-by-user-id/:id",
  orderController.findOrderByUserId
);
orderRouter.get("/find-order-by-status/:name", orderController.findOrderByName);
orderRouter.put("/update-status/:id", orderController.changeStatusByOrderId);

export default orderRouter;
