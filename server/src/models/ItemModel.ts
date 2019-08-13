import mongoose, { Schema, Document } from "mongoose";

//Define a Typescript Interface
export interface IItem extends Document {
    _doc?: Promise<this>;
    item_title: string;
    description: string;
    price: number;
    item_available: number;
    store_address: string;
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
    item_available: {
        type: Number,
        required: [true, "Number of available item for rent should be giving"],
    },
    store_address: {
        type: String,
        required: [true, "An item must have a store address"],
        trim: true,
    },
    pay_option: {
        type: String,
        required: [true, "An item must have pay option"],
        enum: {
            values: ["Pay online", "Pay on pickup"],
            message: "pay_option is either: Pay online, Pay on pickup",
        },
    },
    image_url: {
        type: [String],
        required: [true, "An item must have image url"],
        trim: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        required: true,
    },
    modifiedAt: {
        type: Date,
    },
});

//ADDING date created and date modified using Mongoose
//Document middleware before saving
eventItemSchema.pre("save", function(next): any {
    if (this) {
        let doc = <IItem>this;
        if (!doc.createdAt) {
            doc.createdAt = new Date();
        }
        doc.modifiedAt = new Date();
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
