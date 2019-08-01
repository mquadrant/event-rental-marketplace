import mongoose from "mongoose";

//Product Schema
const Schema = mongoose.Schema;

const eventItemSchema = new Schema({
    item_title: {
        type: String,
        required: [true, "An item must have a title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "An item must have description"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "An item must have a price tag"]
    },
    host_name: {
        type: String,
        required: [true, "An item must have a host name"],
        trim: true,
    },
    store_address: {
        type: String,
        required: [true, "An item must have a store address"],
        trim: true,
    },
    service_type: {
        type: String,
        required: [true, "An item must have a service type"],
        enum: {
            values: ["Rent", "Purchase"],
            message: "Service type is either: Rent, Purchase",
        },
    },
    pay_option: {
        type: String,
        required: [true, "An item must have pay option"],
        enum: {
            values: ["Pay online", "Pay on delivery"],
            message: "pay_option is either: online, delivery",
        },
    },
    image_url: {
        type: [String],
        required: [true, "An item must have image url"],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "An item must have creation date"]
    },
    __v: {
        type: Number,
        select: false,
    }
})

export default mongoose.model('Item',eventItemSchema)