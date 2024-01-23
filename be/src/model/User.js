import mongoose from "mongoose";
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
}, { timestamps: true });

export default mongoose.model("User", User);