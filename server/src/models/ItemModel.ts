import mongoose, { Schema, Document } from "mongoose";

//Define a Typescript Interface
export interface IItem extends Document {
    _doc?: Promise<this>;
    item_title: string;
    description: string;
    price: number;
    store_address: string;
    service_type: string;
    pay_option: string;
    image_url: [string];
    createdAt: string | Date;
    modifiedAt: string | Date;
    creator: string;
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
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

//ADDING date created and date modified using Mongoose
//Document middleware before saving
eventItemSchema.pre("save", function(next): any {
    if (this) {
        let doc = <IItem>this;
        if (!doc.createdAt) {
            doc.createdAt = new Date().toISOString();
        }
        doc.modifiedAt = new Date().toISOString();
    }
    next();
    return this;
});

//Changing the date to ISOString
//Document middleware after saving
eventItemSchema.post<IItem>("save", function(_doc, next): any {
    if (_doc) {
        let doc = <IItem>_doc;
        doc.createdAt = new Date(doc.createdAt).toISOString();
        doc.modifiedAt = new Date(doc.modifiedAt).toISOString();
    }
    next();
    return _doc;
});

export default mongoose.model<IItem>("Item", eventItemSchema);
