import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const Blog = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
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
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });


Blog.plugin(mongoosePaginate);
export default mongoose.model("Blog", Blog);