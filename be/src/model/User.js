import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
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
    tokenExpiration: Date,
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
User.plugin(mongoosePaginate);
export default mongoose.model("User", User);