import mongoose from "mongoose";
const Status = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['pending', 'preparing', 'shipping', 'successful', 'failed'],
    },
}, { timestamps: true });

export default mongoose.model("Status", Status);