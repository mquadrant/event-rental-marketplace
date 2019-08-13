import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    _doc?: Promise<this>;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio?: string;
    website?: string;
    password: string;
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
        type: Date,
        required: true,
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

export default mongoose.model<IUser>("User", userSchema, "users");
