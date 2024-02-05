import mongoose from "mongoose";
const Product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        require: true,
    },
    featured: {
        type: Boolean,
        required: false,
        default: false,
    },
    year: {
        type: Number,
        required: true,
        min: 1000,
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
    describe: {
        type: String,
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
}, { timestamps: true });

export default mongoose.model("Product", Product);