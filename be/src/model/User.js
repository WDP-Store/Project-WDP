import mongoose from "mongoose";
const User = new mongoose.Schema({
    _id: {
        type: String
    },
    name:{
        type:String,
    }
}, { timestamps: true });
export default mongoose.model("users", User);