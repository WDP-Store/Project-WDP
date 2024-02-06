import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Feedback = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
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

Feedback.plugin(mongoosePaginate);

export default mongoose.model("Feedback", Feedback);