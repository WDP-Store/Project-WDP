import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

Category.plugin(mongoosePaginate);

export default mongoose.model("Category", Category);