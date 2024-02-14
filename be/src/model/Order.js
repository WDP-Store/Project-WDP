import mongoose from "mongoose";
import moment from 'moment';

const AddressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    detailAddress: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    }
})

const Order = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: AddressSchema,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        required: true,
        default: moment().format(),
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'VNPAY'],
    },
    orderVnpayId: {
        type: String,
        required: false,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true
    },
    productList: [
        {
            productId: {
                type: String,
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            brand: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            unitPrice: {
                type: Number,
                required: true
            },
            originalPrice: {
                type: Number,
                required: true
            },
        }
    ]
}, { timestamps: true });

export default mongoose.model("Order", Order);