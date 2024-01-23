import mongoose from "mongoose";
const WishList = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("wishLists", WishList);