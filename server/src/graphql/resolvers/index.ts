import bcrypt from "bcryptjs";

import EventItem from "../../models/ItemModel";
import User from "../../models/userModel";

//Nested GraphQL Query
const eventItem = async (itemIds: string[]): Promise<any> => {
    try {
        const items = await EventItem.find({ _id: { $in: itemIds } });
        return items.map(item => {
            return {
                ...item._doc,
                createdAt: new Date(item.createdAt).toISOString(),
                modifiedAt: new Date(item.modifiedAt).toISOString(),
                creator: user.bind(item, item.creator),
            };
        });
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
            createdItems: eventItem.bind(_user, _user.createdItems),
        };
    } catch (err) {
        throw err;
    }
};

export default {
    eventItems: async () => {
        try {
            const items = await EventItem.find();
            return items.map(item => {
                return {
                    ...item._doc,
                    _id: item.id,
                    createdAt: new Date(item.createdAt).toISOString(),
                    modifiedAt: new Date(item.modifiedAt).toISOString(),
                    creator: user.bind(item, item.creator),
                };
            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args: any) => {
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
            return {
                ...result._doc,
                createdAt: new Date(result.createdAt).toISOString(),
                modifiedAt: new Date(result.modifiedAt).toISOString(),
                creator: user.bind(item, result.creator),
            };
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
                createdAt: new Date(result.createdAt).toISOString(),
            };
        } catch (err) {
            throw err;
        }
    },
};
