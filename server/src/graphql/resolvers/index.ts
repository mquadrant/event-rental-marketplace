import bcrypt from "bcryptjs";

import EventItem, { IItem } from "../../models/ItemModel";
import User from "../../models/userModel";
import Booking, { IBooking } from "../../models/bookingModel";
import { dateToString } from "../../helpers/date";

//Booking result transformation
const transformBooking = (booking: IBooking) => {
    return {
        ...booking._doc,
        pickup_date: dateToString(booking.pickup_date),
        return_date: dateToString(booking.return_date),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt),
        item: singleItem.bind(booking, booking.item),
        user: user.bind(booking, booking.user),
    };
};
//Item result transformation
const transformItem = (item: IItem) => {
    return {
        ...item._doc,
        createdAt: dateToString(item.createdAt),
        modifiedAt: dateToString(item.modifiedAt),
        creator: user.bind(item, item.creator),
    };
};

//Nested GraphQL Query
const eventItem = async (itemIds: string[]): Promise<any> => {
    try {
        const items = await EventItem.find({ _id: { $in: itemIds } });
        return items.map(item => {
            return transformItem(item);
        });
    } catch (err) {
        throw err;
    }
};
const singleItem = async (itemId: IItem): Promise<any> => {
    try {
        const item = await EventItem.findById(itemId);
        if (!item) throw new Error("Item not found");
        return transformItem(item);
    } catch (err) {
        throw err;
    }
};
const user = async (userId: String) => {
    try {
        const _user = await User.findById(userId);
        if (!_user) throw new Error("User not found");
        return {
            ..._user._doc,
            createdAt: dateToString(_user.createdAt),
            createdItems: eventItem.bind(_user, _user.createdItems),
        };
    } catch (err) {
        throw err;
    }
};

export default {
    //Queries
    eventItems: async () => {
        try {
            const items = await EventItem.find();
            return items.map(item => {
                return transformItem(item);
            });
        } catch (err) {
            throw err;
        }
    },
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
    createItem: async (args: any) => {
        const item = new EventItem({
            item_title: args.itemInput.item_title,
            description: args.itemInput.description,
            price: args.itemInput.price,
            item_available: args.itemInput.item_available,
            store_address: args.itemInput.store_address,
            pay_option: args.itemInput.pay_option,
            image_url: args.itemInput.image_url,
            creator: args.itemInput.creator,
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
        });
        try {
            //check if the user_id exists
            const _user = await User.findById(args.itemInput.creator);
            if (!_user) throw new Error("User not found");
            //save the item
            const result = await item.save();
            //add the item_id to the user document
            _user.createdItems.push(result.id);
            await _user.save();
            //return the created items
            return transformItem(result);
        } catch (err) {
            throw new Error(err);
        }
    },
    createUser: async (args: any) => {
        try {
            const userExisting = await User.findOne({
                email: args.userInput.email,
            });
            if (userExisting) throw new Error("User exist already.");
            const hashedPassword = await bcrypt.hash(
                args.userInput.password,
                12
            );
            const user = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                password: hashedPassword,
                phone: args.userInput.phone,
                bio: args.userInput.bio,
                website: args.userInput.website,
                isProvider: args.userInput.isProvider,
                image_url: args.userInput.image_url,
                createdAt: new Date().toISOString(),
            });

            const result = await user.save();
            return {
                ...result._doc,
                createdAt: dateToString(result.createdAt),
            };
        } catch (err) {
            throw err;
        }
    },
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
