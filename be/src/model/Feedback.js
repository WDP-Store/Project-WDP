import mongoose from "mongoose";
const Feedback = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
}, { timestamps: true });

export default mongoose.model("Feedback", Feedback);