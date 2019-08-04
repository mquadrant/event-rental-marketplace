import EventItem, { IItem } from "../../models/ItemModel";
import User from "../../models/userModel";
import { IBooking } from "../../models/bookingModel";
import { dateToString } from "../../helpers/date";

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

//Booking result transformation
export const transformBooking = (booking: IBooking) => {
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
export const transformItem = (item: IItem) => {
    return {
        ...item._doc,
        createdAt: dateToString(item.createdAt),
        modifiedAt: dateToString(item.modifiedAt),
        creator: user.bind(item, item.creator),
    };
};
