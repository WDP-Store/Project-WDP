import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

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

Brand.plugin(mongoosePaginate);

export default mongoose.model("Brand", Brand);