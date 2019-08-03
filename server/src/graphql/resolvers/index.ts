import bcrypt from "bcryptjs";

import EventItem from "../../models/ItemModel";
import User from "../../models/userModel";

//Nested GraphQL Query
const eventItem = (itemIds: string[]): Promise<any> => {
    return EventItem.find({ _id: { $in: itemIds } })
        .then(items => {
            return items.map(item => {
                return { ...item._doc, creator: user.bind(item, item.creator) };
            });
        })
        .catch(err => {
            throw err;
        });
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
    eventItems: () => {
        return EventItem.find()
            .then(items => {
                return items.map(item => {
                    return {
                        ...item._doc,
                        _id: item.id,
                        creator: user.bind(item, item.creator),
                    };
                });
            })
            .catch(err => {
                throw err;
            });
    },
    createEvent: async (args: any) => {
        const item = new EventItem({
            item_title: args.itemInput.item_title,
            description: args.itemInput.description,
            price: args.itemInput.price,
            store_address: args.itemInput.store_address,
            service_type: args.itemInput.service_type,
            pay_option: args.itemInput.pay_option,
            image_url: args.itemInput.image_url,
            creator: args.itemInput.creator,
        });
        try {
            //check if the user_id exists
            const _user = await User.findById(args.itemInput.creator);
            if (!_user) throw new Error("User not found");
            //save the item
            const result = await item.save();
            //add the item_id to the user document
            _user.createdItems.push(result._id);
            await _user.save();
            //return the created items
            return {
                ...result._doc,
                creator: user.bind(item, result.creator),
            };
        } catch (err) {
            throw err;
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
            return result;
        } catch (err) {
            throw err;
        }
    },
};
