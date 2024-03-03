import express from "express";
import { blogController } from "../controllers/index.js";
const blogRouter = express.Router();

blogRouter.get("/", blogController.findAll);
blogRouter.get("/admin", blogController.getAllBlogs);
blogRouter.get("/:id", blogController.findOne);
blogRouter.patch("/:id", blogController.update);
blogRouter.delete("/:id", blogController.deleteBlog);
blogRouter.post("/", blogController.create);

export default blogRouter;