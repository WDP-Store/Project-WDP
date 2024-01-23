import mongoose from "mongoose";
const Brand = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false
    },
}, { timestamps: true });

export default mongoose.model("Brand", Brand);