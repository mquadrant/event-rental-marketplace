import mongoose, { Schema, Document } from "mongoose";
import { IItem } from "./ItemModel";

export interface IBooking extends Document, IItem {
    _doc?: Promise<this>;
    item: IItem;
    user: string;
    quantity: number;
    amount: number;
    status: string;
    booking_description: string;
    pickup_date: string | Date;
    return_date: string | Date;
    warranty: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

const bookingSchema: Schema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: "Item",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        quantity: {
            type: Number,
            required: [true, "item quantity must be specified"],
        },
        amount: {
            type: Number,
        },
        status: {
            type: String,
            default: "reserved",
        },
        booking_description: {
            type: String,
        },
        pickup_date: {
            type: Date,
            required: [true, "booking pickup date must be specified"],
        },
        return_date: {
            type: Date,
            required: [true, "booking return date must be specified"],
        },
        warranty: {
            type: Boolean,
            required: [true, "booking must have a warranty field"],
        },
    },
    { timestamps: true }
);

export default mongoose.model<IBooking & IItem>(
    "Book",
    bookingSchema,
    "bookings"
);
