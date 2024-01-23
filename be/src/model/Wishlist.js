import mongoose from "mongoose";
const WishList = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
    }
}, { timestamps: true });

export default mongoose.model("WishList", WishList);