import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Contact = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'Read'],
        default: 'New',
    },
    phone: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true });
Contact.plugin(mongoosePaginate);

export default mongoose.model("Contact", Contact);