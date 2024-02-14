import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Wishlist = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }
}, { timestamps: true });

// Create a unique compound index with both userId and productId
Wishlist.index({ user: 1, product: 1 }, { unique: true });
Wishlist.plugin(mongoosePaginate);

export default mongoose.model("Wishlist", Wishlist);