import express from "express";
import { authController } from "../controllers/index.js";
import uploadCloud from "../config/cloudinary.config.js";
import { v2 as cloudinary } from 'cloudinary'
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/abc", uploadCloud.single("image"), (req, res) => {
    console.log(req.file.path)
    // Further processing or return the image name in the response
    return res.status(200).json({ a: "b" });
});

authRouter.post("/abcd", uploadCloud.array("images", 5), (req, res) => {
    if (req.files) {
        req.files.map((file) => console.log(file));
        // Additional processing using the public IDs or other file details
        // return res.status(200).json({ publicIds });
    }
    // Further processing or return the image name in the response
    return res.status(200).json({ a: "b" });
});

authRouter.post("/de", async (req, res) => {
    const a = await cloudinary.uploader.destroy("hrvofr99l70isxxtsr6h");
    // const a = cloudinary.api
    //     .delete_resources(['member/1710260583401-451-maojpg.jpg'],
    //         { type: 'upload', resource_type: 'image' })
    //     .then(console.log);
    // const a = cloudinary.api
    //     .delete_resources(['member/1710260583401-451-maojpg'],
    //         { type: 'upload', resource_type: 'image' })
    //     .then(console.log);
    console.log(a)
    return res.status(200).json({ a: "b" });
});

// authRouter.post("/abc", uploadCloud.single("image"), (req, res) => {
//     return res.status(200).json({
//         a: "b"
//     })
// });

export default authRouter;