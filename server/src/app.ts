import createError from "http-errors";
import express,{Request,Response,NextFunction} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import  logger from "morgan";
import graphqlHttp from "express-graphql";
import {buildSchema} from 'graphql'

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

interface Item{
    _id:string,
    item_title:string,
    description:string,
    price:number,
    host_name:string,
    store_address:string,
    service_type:string,
    pay_option:string,
    image_url: [string],
    date: string | Date
}
const EventItems:Item[] = [];
app.use('/graphql',graphqlHttp({
  schema:buildSchema(`
  type EventItem {
    _id: ID!
    item_title: String!
    description: String!
    price: Float!
    host_name: String!
    store_address: String!
    service_type: String!
    pay_option: String!
    image_url:[String!]!
    date: String!
  }

  input EventInput {
    item_title: String!
    description: String!
    price: Float!
    host_name: String!
    store_address: String!
    service_type: String!
    pay_option: String!
    image_url:[String!]!
  }

  type RootQuery {
    eventItems:[EventItem!]!
  }

  type RootMutation{
    createEvent(eventItem:EventInput):EventItem
  }

  schema{
    query: RootQuery,
    mutation: RootMutation
  }
  `),
  rootValue:{
    eventItems:()=>{
      return EventItems;
    },
    createEvent:(args:any)=>{
      console.log(args.eventItem)
      const event = {
        _id:Math.random().toString(),
        item_title:args.eventItem.item_title,
        description:args.eventItem.description,
        price:args.eventItem.price,
        host_name:args.eventItem.host_name,
        store_address:args.eventItem.store_address,
        service_type:args.eventItem.service_type,
        pay_option:args.eventItem.pay_option,
        image_url:args.eventItem.image_url,
        date:new Date().toISOString()
      }
      EventItems.push(event);
      return event;
    }
  },
  graphiql:true
}))


// catch 404 and forward to error handler
app.use(function(_req:Request, _res:Response, next) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, _next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
