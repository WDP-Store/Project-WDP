import mongoose from "mongoose";
const Feedback = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
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

export default mongoose.model("feedbacks", Feedback);