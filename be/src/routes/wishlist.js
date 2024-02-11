import express from "express";
import { wishlistController } from "../controllers/index.js";

const wishlistRouter = express.Router();

wishlistRouter.get("/", wishlistController.findAll);
wishlistRouter.delete("/:id", wishlistController.deleteWishlist);
wishlistRouter.post("/", wishlistController.create);

export default wishlistRouter;