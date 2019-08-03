import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    _doc?: Promise<this>;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio?: string;
    website?: string;
    password?: string | null;
    isProvider: boolean;
    createdAt: string | Date;
    image_url?: string;
    addressDetail?: {
        address: string;
        country: string;
        state: string;
        city: string;
    };
    social?: {
        facebook: String;
        twitter: String;
        instagram: String;
    };
    createdItems: string[];
}

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: [true, "A user should have first name"],
    },
    lastName: {
        type: String,
        required: [true, "A user should have last name"],
    },
    email: {
        type: String,
        required: [true, "A user should have password"],
    },
    phone: {
        type: String,
        required: [true, "A user should have phone number"],
    },
    bio: {
        type: String,
    },
    website: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "A user should have password"],
    },
    isProvider: {
        type: Boolean,
        required: [true, "A user should have password"],
    },
    createdAt: {
        type: String,
    },
    addressDetail: {
        address: String,
        country: String,
        state: String,
        city: String,
    },
    image_url: {
        type: String,
    },
    social: {
        facebook: String,
        twitter: String,
        instagram: String,
    },
    createdItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Item",
        },
    ],
});

//NULLIFING the password using Mongoose and changing the date to ISOString
//Document middleware after saving
userSchema.post<IUser>("save", function(_doc, next): any {
    if (_doc) {
        let doc = <IUser>_doc;
        doc.password = null;
        doc.createdAt = new Date(doc.createdAt).toISOString();
    }
    next();
    return _doc;
});

export default mongoose.model<IUser>("User", userSchema, "users");
