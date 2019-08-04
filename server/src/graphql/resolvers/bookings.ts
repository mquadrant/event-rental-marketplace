import { transformBooking, transformItem } from "./merge";
import Booking from "../../models/bookingModel";

export default {
    //Queries
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    //Mutations
    bookItem: async (args: any) => {
        const booking = new Booking({
            item: args.bookingInput.itemID,
            user: args.bookingInput.userID,
            quantity: args.bookingInput.quantity,
            amount: args.bookingInput.amount,
            booking_description: args.bookingInput.booking_description,
            pickup_date: args.bookingInput.pickup_date,
            return_date: args.bookingInput.return_date,
            warranty: args.bookingInput.warranty,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        try {
            //save the booking
            const result = await booking.save();
            return transformBooking(result);
        } catch (err) {
            throw new Error(err);
        }
    },
    cancelBooking: async (args: any) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate(
                "item"
            );
            if (!booking) throw new Error("booking not exist");
            const item = transformItem(booking.item);
            await Booking.deleteOne({ _id: args.bookingId });
            return item;
        } catch (err) {
            throw err;
        }
    },
};
