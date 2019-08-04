import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/userModel";
import { dateToString } from "../../helpers/date";

export default {
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
                password: null,
                createdAt: dateToString(result.createdAt),
            };
        } catch (err) {
            throw err;
        }
    },
    login: async (args: any) => {
        try {
            const user = await User.findOne({ email: args.email });
            if (!user) throw new Error("Login Failed");
            const isEqual = await bcrypt.compare(args.password, user.password);
            if (!isEqual) throw new Error("Login Failed");
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                "somesupersecretkey",
                {
                    expiresIn: "1h",
                }
            );
            return {
                userId: user.id,
                token: token,
                tokenExpiration: 1,
            };
        } catch (err) {
            throw err;
        }
    },
};
