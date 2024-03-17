import express from "express";
import uploadCloud from "../config/cloudinary.config.js";
import { blogController } from "../controllers/index.js";
const blogRouter = express.Router();

blogRouter.get("/", blogController.findAll);
blogRouter.get("/admin", blogController.getAllBlogs);
blogRouter.get("/:id", blogController.findOne);
blogRouter.patch("/:id", uploadCloud.single("image"), blogController.update);
blogRouter.delete("/:id", blogController.deleteBlog);
blogRouter.post("/", uploadCloud.single("image"), blogController.create);

export default blogRouter;