import mongoose from "mongoose";
const Status = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("statuses", Status);