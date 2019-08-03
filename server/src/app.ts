import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import graphqlHttp from "express-graphql";
import graphqlSchema from "./graphql/schema";
import graphqlResolver from "./graphql/resolvers";

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
        schema: graphqlSchema,
        rootValue: graphqlResolver,
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
