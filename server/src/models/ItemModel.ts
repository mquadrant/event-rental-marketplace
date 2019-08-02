import mongoose, { Schema, Document } from "mongoose";

//Define a Typescript Interface
export interface IItem extends Document {
    item_title: string;
    description: string;
    price: number;
    host_name: string;
    store_address: string;
    service_type: string;
    pay_option: string;
    image_url: [string];
    createdAt: string | Date;
    modifiedAt: string | Date;
}

//Product Schema
const eventItemSchema: Schema = new Schema({
    item_title: {
        type: String,
        required: [true, "An item must have a title"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "An item must have description"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "An item must have a price tag"],
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
    createdAt: {
        type: Date,
    },
    modifiedAt: {
        type: Date,
    },
});

//ADDING date created and date modified using Mongoose
//Document middleware before saving
eventItemSchema.pre<IItem>("save", function(next): any {
    if (this) {
        let doc = <IItem>this;
        let now = new Date().toISOString();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export default mongoose.model<IItem>("Item", eventItemSchema);
