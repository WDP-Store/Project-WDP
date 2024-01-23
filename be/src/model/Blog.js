import mongoose from "mongoose";
const Blog = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("blogs", Blog);