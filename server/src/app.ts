import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";
import bcrypt from "bcryptjs";

import EventItem from "./models/ItemModel";
import User from "./models/userModel";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(
    "/graphql",
    graphqlHttp({
        schema: buildSchema(`
        type EventItem {
          _id: ID!
          item_title: String!
          description: String!
          price: Float!
          store_address: String!
          service_type: String!
          pay_option: String!
          image_url:[String!]!
          createdAt: String!
          modifiedAt: String!
          creator: String!
        }

        type AddressDetail  {
          address: String
          country: String
          state: String
          city: String
      }

        type Social {
          facebook: String
          twitter: String
          instagram: String
      }

        type User {
          _id: ID!
          firstName: String!
          lastName: String!
          email: String!
          password: String
          phone: String!
          bio: String
          website: String
          image_url: String
          isProvider: String!
          createdAt: String
          addressDetail: AddressDetail,
          social: Social
        }

        input ItemInput {
          item_title: String!
          description: String!
          price: Float!
          store_address: String!
          service_type: String!
          pay_option: String!
          image_url:[String!]!
          creator: String!
        }

        input UserInput {
          firstName: String!
          lastName: String!
          email: String!
          password: String!
          phone: String!
          bio: String
          website: String
          isProvider: Boolean!
          image_url: String
          
        }

        type RootQuery {
          eventItems:[EventItem!]!
        }

        type RootMutation{
          createEvent(itemInput:ItemInput):EventItem,
          createUser(userInput:UserInput):User
        }

        schema{
          query: RootQuery,
          mutation: RootMutation
        }
      `),
        rootValue: {
            eventItems: () => {
                try {
                    const items = EventItem.find();
                    return items;
                } catch (err) {
                    throw err;
                }
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
                    const user = await User.findById(args.itemInput.creator);
                    if (!user) throw new Error("User not found");
                    //save the item
                    const result = await item.save();
                    //add the item_id to the user document
                    user.createdItems.push(result._id);
                    await user.save();
                    //return the created item
                    return result;
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
        },
        graphiql: true,
    })
);

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next) {
    next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, _next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;
