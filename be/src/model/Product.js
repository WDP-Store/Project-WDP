import mongoose from "mongoose";
const Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    brandId: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        required: false,
        default: false,
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    detail: {
        type: String,
        required: true
    },
    decribe: {
        type: String,
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: false
    },
}, { timestamps: true });

export default mongoose.model("products", Product);