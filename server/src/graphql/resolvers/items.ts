import { transformItem } from "./merge";

import EventItem from "../../models/ItemModel";
import User from "../../models/userModel";

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
    //Mutations
    createItem: async (args: any, req: any) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
        const item = new EventItem({
            item_title: args.itemInput.item_title,
            description: args.itemInput.description,
            price: args.itemInput.price,
            item_available: args.itemInput.item_available,
            store_address: args.itemInput.store_address,
            pay_option: args.itemInput.pay_option,
            image_url: args.itemInput.image_url,
            creator: req.userId,
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
        });
        try {
            //check if the user_id exists
            const _user = await User.findById(req.userId);
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
};
