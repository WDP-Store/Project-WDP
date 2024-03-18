import express from "express";
import uploadCloud from "../config/cloudinary.config.js";
import { blogController } from "../controllers/index.js";
const blogRouter = express.Router();
import check from "../middlewares/verifyToken.js"


blogRouter.get("/", blogController.findAll);
blogRouter.get("/admin", blogController.getAllBlogs);
blogRouter.get("/:id", blogController.findOne);
blogRouter.patch("/:id", check.checkLogin, check.checkAdmin, uploadCloud.single("image"), blogController.update);
blogRouter.delete("/:id", check.checkLogin, check.checkAdmin, blogController.deleteBlog);
blogRouter.post("/", check.checkLogin, check.checkAdmin, uploadCloud.single("image"), blogController.create);

export default blogRouter;